"use client";

import { Image } from "next-sanity/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { urlForImage } from "@/sanity/lib/utils";
import React from "react";
import { cn } from "@/lib/utils";

// Define a type for the service items used in this component based on Sanity's schema
interface ServiceItem {
  _id: string;
  _key?: string;
  _type?: "services";
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title?: string | null;
  description?: string | null;
  icon?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    alt?: string;
    _type?: "image";
    imageUrl?: string | null;
    blurDataUrl?: string | null;
    fullAsset?: {
      _id?: string;
      metadata?: {
        lqip?: string;
      };
    } | null;
  } | null;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    alt?: string;
    _type?: "image";
    imageUrl?: string | null;
    blurDataUrl?: string | null;
    fullAsset?: {
      _id?: string;
      metadata?: {
        lqip?: string;
      };
    } | null;
  } | null;
}

interface HoverTabsStaticProps {
  content: ServiceItem[];
}

export default function HoverTabsStatic({ block }: HoverTabsStaticProps) {
  // These are services
  const items = block || [];

  const [activeTab, setActiveTab] = React.useState(items[0]?.title || "");

  function handleClick(industry: string) {
    setActiveTab(industry);
  }

  return (
    <Tabs value={activeTab} className="grid w-full grid-cols-2">
      <section className="w-full">
        <TabsList className="flex flex-col border-l border-t border-slate-300">
          {items.map((tab) => (
            <TabsTrigger
              key={tab._key || tab._id}
              value={tab.title || ""}
              className="flex items-center border-b border-slate-300 py-1 md:px-4 md:py-3"
              onClick={() => handleClick(tab.title || "")}
              onMouseEnter={() => handleClick(tab.title || "")}
            >
              <h3 className="text-xl text-secondary group-data-[state=inactive]:text-white md:text-xl">
                {tab.title}
              </h3>
              <div className="p-2">
                <Image
                  className="brightness-0 invert"
                  src={tab.icon?.imageUrl || ""}
                  alt={tab.icon?.alt || ""}
                  width={20}
                  height={20}
                />
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </section>
      <section className="h-full w-0 items-center justify-center border border-white md:static md:flex md:w-full">
        {items.map((item) => {
          const imageAsset = item.image;
          const lqip = item?.image?.fullAsset?.metadata?.lqip;

          return (
            <TabsContent
              className="flex h-full items-center justify-center"
              key={item._key || item._id}
              value={item.title || ""}
            >
              {imageAsset?.asset?._ref ? (
                <div className="flex max-h-full md:hidden">
                  <Image
                    src={urlForImage(imageAsset)?.url() as string}
                    height={250}
                    width={250}
                    alt={imageAsset.alt || ""}
                    placeholder="blur"
                    blurDataURL={lqip || ""}
                    className="fixed bottom-0 right-0 m-auto mb-4 mr-4 max-h-full w-1/2 rounded-lg"
                  />
                </div>
              ) : null}

              {/* Desktop Image */}
              <div className="relative hidden max-h-full w-full md:flex">
                {imageAsset?.asset?._ref ? (
                  <Image
                    className="max-h-80 rounded-lg object-contain"
                    src={urlForImage(imageAsset)?.url() as string}
                    width={item?.image?.fullAsset?.metadata?.dimensions?.width}
                    height={
                      item?.image?.fullAsset?.metadata?.dimensions?.height
                    }
                    alt={imageAsset.alt || ""}
                    placeholder="blur"
                    blurDataURL={lqip || ""}
                  />
                ) : null}
              </div>
            </TabsContent>
          );
        })}
      </section>
    </Tabs>
  );
}
