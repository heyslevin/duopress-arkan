"use client";

import * as React from "react";

import { UseEmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils";

type FadeCarouselProps = {
  items: any;
  options?: any;
  className?: string;
};

export function FadeCarousel({ items, options, className }: FadeCarouselProps) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Fade(), Autoplay({ delay: options?.delay || 3000 })]}
      className=""
    >
      <CarouselContent>
        {items.map((item: any) => {
          if (!item?._key || !item?.asset?._ref) return null;

          const image = item;
          return (
            <CarouselItem key={item._key} className="">
              <div className={cn("overflow-hidden rounded-lg", className)}>
                <Image
                  className="aspect-square object-cover"
                  src={urlForImage(image)?.url() as string}
                  alt={image.alt || "Carousel image"}
                  width={2000}
                  height={2000}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
