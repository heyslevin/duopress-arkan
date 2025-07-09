"use client";

import { FadeCarousel } from "../FadeCarousel";
import { splitGalleryData, urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";
import React, { useRef } from "react";
import BlockContainer from "../BlockContainer";
import ResolvedLink from "../ResolvedLink";
import type {
  MiniGalleries as MiniGalleriesType,
  PhotoGallery,
} from "@/sanity.types";
import StyledResolvedLink from "../StyledResolvedLink";

type MiniGalleriesProps = {
  block: MiniGalleriesType;
  index?: number;
};

export default function MiniGalleries({ block }: MiniGalleriesProps) {
  if (!block) return null;
  const { gallery1, gallery2, gallery3, fixedImage } = block;

  const hasGalleries =
    (gallery1?.images?.length || 0) +
      (gallery2?.images?.length || 0) +
      (gallery3?.images?.length || 0) >
    0;
  const hasFixedImage = fixedImage?.asset?._ref;

  if (!hasGalleries && !hasFixedImage) return null;

  return (
    <BlockContainer className="px-4 py-6 md:px-8 md:py-10">
      <div className="flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-accent-foreground p-4 md:flex-row md:items-stretch md:gap-5 md:p-8">
        <section className="flex w-full flex-col gap-3 text-primary md:w-1/2 md:items-start md:gap-4 md:px-0 md:pr-4">
          {block.caption && (
            <h3 className="text-sm md:text-base">{block.caption}</h3>
          )}
          {block.heading && (
            <h3 className="text-3xl md:mb-auto lg:text-6xl">{block.heading}</h3>
          )}
          {block.text && (
            <p className="max-w-md whitespace-pre-wrap text-base lg:text-xl">
              {block.text}
            </p>
          )}

          {block.button && (
            <StyledResolvedLink
              className="mt-3 md:mt-4"
              button={block.button}
              style="ghost"
            />
          )}
        </section>

        {/* Mobile Gallery */}
        <section className="grid grid-cols-2 gap-3 md:hidden md:w-1/2 md:gap-4">
          {gallery1?.images?.length > 0 && (
            <FadeCarousel
              items={gallery1.images}
              options={{ delay: 4200 }}
              className="bg-primary p-5"
            />
          )}
          {gallery2?.images?.length > 0 && (
            <FadeCarousel items={gallery2.images} options={{ delay: 9500 }} />
          )}
          {gallery3?.images?.length > 0 && (
            <FadeCarousel items={gallery3.images} options={{ delay: 6200 }} />
          )}
          {hasFixedImage && (
            <div className="aspect-square overflow-hidden rounded-lg bg-accent">
              <div className="relative h-full w-full">
                <Image
                  className="object-contain p-14 md:p-20"
                  src={urlForImage(fixedImage)?.url() as string}
                  alt={fixedImage.alt || "Fixed image"}
                  fill
                />
              </div>
            </div>
          )}
        </section>

        {/* Desktop Gallery */}
        <section className="hidden grid-cols-2 gap-4 md:grid md:w-1/2">
          {gallery1?.images?.length > 0 && (
            <FadeCarousel
              items={gallery1.images}
              options={{ delay: 4200 }}
              className="bg-primary p-3 md:p-5"
            />
          )}
          {gallery2?.images?.length > 0 && (
            <FadeCarousel items={gallery2.images} options={{ delay: 9500 }} />
          )}
          {gallery3?.images?.length > 0 && (
            <FadeCarousel items={gallery3.images} options={{ delay: 6200 }} />
          )}
          {hasFixedImage && (
            <div className="aspect-square overflow-hidden rounded-lg bg-accent">
              <div className="relative h-full w-full">
                <Image
                  className="object-contain p-10 md:p-20"
                  src={urlForImage(fixedImage)?.url() as string}
                  alt={fixedImage.alt || "Fixed image"}
                  fill
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </BlockContainer>
  );
}
