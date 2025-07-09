import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type Tabs = {
  _type: "tabs";
  title?: string;
  caption?: string;
  heading?: string;
  tabs: Array<{
    heading?: string;
    description?: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
      imageUrl: string | null;
      blurDataUrl: string | null;
    } | null;
    _type: "tab";
    _key: string;
  }>;
};

type TabsProps = {
  block: Tabs;
  index: number;
};

export default function Tabs({ block }: TabsProps) {
  if (!block) return null;

  return (
    <div className="container px-4 py-6 md:px-8 md:py-10">
      {block.heading && (
        <div className="text-xl md:text-2xl">{block.heading}</div>
      )}

      {block.tabs && block.tabs.length > 0 && (
        <div className="mt-4 space-y-6 md:mt-6 md:space-y-8">
          {block.tabs.map((tab) => {
            const image = tab?.image?.asset?._ref;

            return (
              <div
                key={tab?._key}
                className="flex flex-col gap-4 md:flex-row md:gap-8"
              >
                <div className="flex flex-col gap-2 md:w-1/2">
                  {tab?.description && (
                    <div className="text-sm md:text-base">
                      {tab.description}
                    </div>
                  )}
                  {tab?.heading && (
                    <div className="text-lg font-medium md:text-xl">
                      {tab.heading}
                    </div>
                  )}
                </div>

                {tab?.image?.imageUrl && (
                  <div className="relative h-48 w-full md:h-64 md:w-1/2">
                    <Image
                      className="object-cover"
                      alt={tab?.image?.alt || ""}
                      src={tab.image.imageUrl}
                      fill={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
