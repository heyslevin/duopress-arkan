"use client";

import { Image } from "next-sanity/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { urlForImage } from "@/sanity/lib/utils";
import React from "react";
import { cn } from "@/lib/utils";

export default function HoverTabs({ tabs }: any) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].industry);
  const [hiddenImage, setHiddenImage] = React.useState(true); // Controls fade-out
  const [isVisible, setIsVisible] = React.useState(false); // Controls DOM presence
  const timeoutRef = React.useRef<number | null>(null);

  function handleClick(industry: any) {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current); // Clear any ongoing timeout
    }

    setActiveTab(industry);
    setIsVisible(true); // Ensure the image is in the DOM
    setHiddenImage(false); // Start fade-in

    // Start fade-out after 3 seconds
    timeoutRef.current = window.setTimeout(() => {
      setHiddenImage(true); // Trigger fade-out
      setTimeout(() => setIsVisible(false), 300); // Remove from DOM after fade-out
    }, 3000);
  }

  React.useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Tabs
      value={activeTab}
      className="flex w-full flex-row items-stretch md:gap-6"
    >
      <section className="w-full md:w-1/2">
        <TabsList className="flex flex-col border-t border-slate-300">
          {tabs.map((tab: any) => (
            <TabsTrigger
              key={tab._key}
              value={tab.industry}
              className="flex items-center border-b border-slate-300 py-1 md:py-3"
              onClick={() => handleClick(tab.industry)}
              onMouseEnter={() => handleClick(tab.industry)}
            >
              <h3 className="text-xl group-data-[state=inactive]:text-stone-500 md:text-xl">
                {tab.industry}
              </h3>
              <div className="w-20 rounded-lg border border-slate-400 p-2 group-data-[state=active]:border-[#0000FF] group-data-[state=active]:bg-[#CFFFFF]">
                <p className="text-lg group-data-[state=active]:text-[#0000FF] group-data-[state=inactive]:text-slate-500 md:text-xl">
                  {tab.percentage}%
                </p>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </section>
      <section className="w-0 items-center md:static md:flex md:w-1/2">
        {tabs.map((tab: any) => {
          const imageAsset = tab.image;
          const lqip = tab?.image?.fullAsset?.metadata?.lqip;

          return (
            <TabsContent key={tab._key} value={tab.industry}>
              {imageAsset?.asset?._ref ? (
                <div className="flex md:hidden">
                  {isVisible && ( // Only render Image if visible
                    <Image
                      src={urlForImage(imageAsset)?.url() as string}
                      height={250}
                      width={250}
                      alt={imageAsset.alt || ""}
                      placeholder="blur"
                      blurDataURL={lqip || ""}
                      className={cn(
                        "fixed bottom-0 right-0 m-auto mb-4 mr-4 w-1/2 rounded-lg transition-opacity duration-300",
                        hiddenImage ? "opacity-0" : "opacity-100",
                      )}
                    />
                  )}
                </div>
              ) : null}

              {/* Desktop Image */}
              <div className="hidden md:flex">
                {imageAsset?.asset?._ref ? (
                  <Image
                    className="rounded-lg"
                    src={urlForImage(imageAsset)?.url() as string}
                    height={500}
                    width={700}
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
