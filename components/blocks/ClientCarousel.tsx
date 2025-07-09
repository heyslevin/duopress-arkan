"use client";

import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CarouselContent, CarouselItem } from "../ui/carousel";
import { Carousel } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";

// Define the client item type
interface ClientItem {
  _key: string;
  name?: string;
  logo?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    _type?: "image";
    imageUrl?: string | null;
    blurDataUrl?: string | null;
    fullAsset?: {
      _id?: string;
      metadata?: {
        lqip?: string;
      };
    } | null;
  };
}

interface LogoItem {
  _key: string;
  _type?: string;
  asset?: {
    _ref: string;
  };
  alt?: string;
  imageUrl?: string;
  blurDataUrl?: string;
  fullAsset?: {
    metadata?: {
      lqip?: string;
    };
  };
}

export type ClientCarouselType = {
  _key: string;
  _type: "clientCarousel";
  heading?: string;
  caption?: string;
  style?: "light" | "dark";
  clientLogos?: {
    logos?: LogoItem[];
  };
};

type ClientCarouselProps = {
  block: ClientCarouselType;
  index?: number;
};

export default function ClientCarousel({ block }: ClientCarouselProps) {
  if (!block) return null;

  const clients = block.clientLogos?.logos || [];
  const content = block;
  // light || dark
  const theme = content.style || "light";

  if (!clients.length) return null;

  return (
    <BlockContainer
      backgroundClassName={cn(
        theme === "dark" && "bg-primary",
        theme === "light" && "bg-muted",
      )}
      className="px-4 py-6 md:px-8 md:py-10"
    >
      {content?.heading && (
        <h3 className="mb-3 text-center font-body text-sm text-black md:mb-4 md:text-base">
          {content.heading}
        </h3>
      )}

      <Carousel
        opts={{ loop: true, containScroll: "keepSnaps", align: "start" }}
        plugins={[Autoplay()]}
        className="relative w-full"
      >
        <CarouselContent>
          {clients.map((client, index) => {
            if (!client?.asset?._ref) return null;

            return (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/6">
                <div
                  className={cn(
                    "relative flex h-12 items-center justify-center rounded-md md:h-16 md:h-24",
                    theme === "dark" && "bg-white/10",
                    theme === "light" && "border border-gray-300 bg-none",
                  )}
                >
                  <Image
                    className={cn(
                      "object-contain p-2 brightness-0 md:p-4 md:p-8",
                      theme === "dark" && "invert",
                      theme === "light" && "",
                    )}
                    src={urlForImage(client)?.url() as string}
                    alt={client.alt || "Client logo"}
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
