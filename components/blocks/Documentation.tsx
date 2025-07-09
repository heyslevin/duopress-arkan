"use client";

import BlockContainer from "../BlockContainer";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { PortableParagraph } from "../PortableParagraph";
import { useEffect, useState } from "react";

interface DocumentItem {
  _key: string;
  sectionId?: string;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "h1" | "h2" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      post?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  file: null;
}

interface DocumentationType {
  _key: string;
  _type: "documentationType";
  sectionId?: string;
  heading?: string;
  documents?: DocumentItem[] | null;
}

export function Documentation({
  block,
  props,
}: {
  block: DocumentationType;
  props: any;
}) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      },
    );

    // Observe all document sections
    block.documents?.forEach((doc) => {
      const element = document.getElementById(doc.sectionId || doc._key);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [block.documents]);

  console.log({ block, props });
  return (
    <BlockContainer id={block.sectionId}>
      <style jsx>{`
        .mobile-nav-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        .mobile-nav-scroll::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>
      <section className="flex w-full justify-end pb-12 md:pb-20">
        <div className="w-full md:w-3/4">
          <h1 className="max-w-2xl text-balance font-display text-4xl text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {block.heading}
          </h1>
        </div>
      </section>

      <div className="flex w-full flex-col lg:flex-row">
        {/* Sticky Navigation */}
        <div className="sticky top-12 mb-8 w-full bg-muted/95 py-4 backdrop-blur-sm max-sm:z-20 lg:mb-0 lg:w-1/4 lg:bg-transparent lg:backdrop-blur-none">
          <div className="flex flex-row gap-4 lg:flex-col lg:gap-2 lg:overflow-x-visible">
            {/* Mobile Navigation */}
            <div className="w-full lg:hidden">
              <div className="mobile-nav-scroll flex touch-pan-x justify-start gap-6 overflow-x-auto">
                {block.documents?.map((doc) => (
                  <a
                    key={doc._key}
                    href={`#${doc.sectionId || doc._key}`}
                    className={`flex-shrink-0 whitespace-nowrap border-b-2 pb-3 text-sm transition-colors ${
                      activeSection === (doc.sectionId || doc._key)
                        ? "border-primary text-primary"
                        : "border-transparent text-primary/60 hover:text-primary"
                    }`}
                  >
                    <h3>{doc.sectionId}</h3>
                  </a>
                ))}
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:flex-col lg:gap-2">
              {block.documents?.map((doc) => (
                <a
                  key={doc._key}
                  href={`#${doc.sectionId || doc._key}`}
                  className={`block text-sm transition-colors ${
                    activeSection === (doc.sectionId || doc._key)
                      ? "font-medium text-primary"
                      : "text-primary/60 hover:text-primary"
                  }`}
                >
                  <h3>{doc.sectionId}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full py-4 lg:w-3/4">
          {block.documents?.map((doc) => (
            <div
              key={doc._key}
              id={doc.sectionId || doc._key}
              className="mb-8 scroll-mt-32"
            >
              {doc.sectionId && (
                <h3 className="mb-4 text-2xl text-gray-900 sm:text-3xl md:text-4xl">
                  {doc.sectionId}
                </h3>
              )}
              {doc.content && (
                <div className="max-w-full lg:max-w-2xl">
                  <PortableText
                    components={PortableParagraph as any}
                    value={doc.content as PortableTextBlock[]}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockContainer>
  );
}
