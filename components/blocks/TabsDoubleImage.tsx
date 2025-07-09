"use client";

import { Image } from "next-sanity/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { urlForImage } from "@/sanity/lib/utils";
import React from "react";
import BlockContainer from "../BlockContainer";

type TabItem = {
  _id?: string;
  _type: "tab";
  title?: string;
  text?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    _type: "image";
    alt?: string;
    fullAsset?: {
      metadata?: {
        lqip?: string;
      };
    };
  };
};

type TabsDoubleImageProps = {
  block: {
    _type: "tabsDoubleImage";
    heading?: string;
    caption?: string;
    clientsTab?: TabItem[];
    tabs?: TabItem[];
    settings?: {
      brandAssets?: {
        secondaryLogo?: {
          asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
          };
          _type: "image";
          alt?: string;
        };
      };
    };
  };
};

export default function TabsDoubleImage({ block }: TabsDoubleImageProps) {
  if (!block) return null;

  const items = block.clientsTab || block.tabs || [];
  if (!items.length) return null;

  const [activeTab, setActiveTab] = React.useState(items[0]?.title || "");

  function handleClick(industry: string) {
    setActiveTab(industry);
  }

  const secondaryLogo = block.settings?.brandAssets?.secondaryLogo;
  return (
    <BlockContainer className="flex flex-col gap-3 py-6 text-primary md:gap-4">
      <Tabs
        value={activeTab}
        className="flex w-full flex-col md:grid md:grid-cols-2 md:gap-8"
      >
        <section className="flex w-full flex-col gap-4 md:gap-10">
          <div className="flex w-full flex-col gap-2 self-start md:gap-4">
            {block.caption && (
              <h4 className="text-xs md:text-base">{block.caption}</h4>
            )}

            {block.heading && (
              <h2 className="text-balance text-xl md:text-6xl">
                {block.heading}
              </h2>
            )}
          </div>

          <TabsList className="flex flex-col border-t border-slate-200">
            {items.map((tab: TabItem) => (
              <TabsTrigger
                key={tab._id}
                value={tab.title || ""}
                className="flex items-center border-b border-slate-200 py-1 md:py-3"
                onClick={() => handleClick(tab.title || "")}
                onMouseEnter={() => handleClick(tab.title || "")}
              >
                {tab.title && (
                  <h3 className="text-base text-secondary group-data-[state=inactive]:text-black md:text-xl">
                    {tab.title}
                  </h3>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </section>

        {/* Image Section - Hidden on mobile, shown on desktop */}
        <section className="relative isolate mt-4 h-auto w-full md:mt-0">
          {/* Logo Image */}
          {secondaryLogo && (
            <div className="absolute bottom-2 right-2 z-10 aspect-square max-h-full w-16 rounded-md bg-primary md:bottom-0 md:right-0 md:flex md:w-60 md:translate-y-10">
              <Image
                className="rounded-lg object-contain p-3 brightness-0 invert md:p-16"
                src={urlForImage(secondaryLogo)?.url() as string}
                fill
                alt={secondaryLogo.alt || ""}
              />
            </div>
          )}

          {items.map((item: TabItem) => {
            const imageAsset = item.image;
            const lqip = item?.image?.fullAsset?.metadata?.lqip;

            return (
              <TabsContent
                className="relative mt-0 flex w-full items-center justify-center"
                key={item._id}
                value={item.title || ""}
              >
                {/* Mobile Image */}
                {imageAsset?.asset?._ref && (
                  <div className="flex w-full md:hidden">
                    <div className="relative flex aspect-[3/2] w-full">
                      <Image
                        className="rounded-lg bg-primary object-cover"
                        src={
                          urlForImage(imageAsset)
                            .width(800)
                            .height(600)
                            .url() as string
                        }
                        fill
                        alt={imageAsset.alt || ""}
                      />
                    </div>
                  </div>
                )}

                {/* Desktop Image */}
                {imageAsset?.asset?._ref && (
                  <div className="hidden w-full md:block">
                    <div className="relative flex aspect-[3/2] w-4/5">
                      <Image
                        className="rounded-lg bg-primary object-cover"
                        src={
                          urlForImage(imageAsset).height(500).url() as string
                        }
                        fill
                        alt={imageAsset.alt || ""}
                        priority
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </section>
      </Tabs>
    </BlockContainer>
  );
}
