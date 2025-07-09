"use client";

import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Image } from "next-sanity/image";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";
import { urlForImage } from "@/sanity/lib/utils";

interface ImagesCarouselBlock {
  _type: "imagesCarousel";
  _key: string;
  sectionId?: string;
  images?: {
    _type: "photoGallery";
    images?: Array<{
      _key: string;
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: {
        _type: "sanity.imageHotspot";
        x?: number;
        y?: number;
        height?: number;
        width?: number;
      };
      crop?: {
        _type: "sanity.imageCrop";
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
      caption?: string;
      alt?: string;
      _type: "image";
    }>;
  };
  theme?: "dark" | "light";
}

interface ImagesCarouselProps {
  block: ImagesCarouselBlock;
  index: number;
}

export default function ImagesCarousel({ block, index }: ImagesCarouselProps) {
  if (!block) return null;

  const images = block.images?.images || [];
  const theme = block.theme || "light";

  if (!images.length) return null;

  return (
    <BlockContainer
      backgroundClassName={cn(
        theme === "dark" && "bg-primary",
        theme === "light" && "bg-muted",
      )}
      className="px-0 py-6 md:m-0 md:w-full md:max-w-[3000px] md:px-0 md:py-0"
    >
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[
          AutoScroll({
            speed: 1,
            startDelay: 0,
          }),
        ]}
        className="relative w-full"
      >
        <CarouselContent>
          {images.map((image) => {
            if (!image?.asset?._ref || !image?._key) return null;

            return (
              <CarouselItem key={image._key} className="basis-1/2 md:basis-1/6">
                <div className="fle relative h-48 items-center justify-center rounded-md bg-none">
                  <Image
                    className="object-contain"
                    src={urlForImage(image)?.url() as string}
                    alt={image.alt || "Gallery image"}
                    fill
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </BlockContainer>
  );
}
