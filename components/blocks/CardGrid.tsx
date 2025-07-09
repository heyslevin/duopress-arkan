"use client";

import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import React from "react";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";
import Link from "next/link";

// Type for an individual card
interface CardItem {
  _key: string;
  _id: string;
  title?: string;
  text?: string;
  summary?: string;
  description?: string;
  icon?: {
    imageUrl?: string;
    alt?: string;
    asset?: {
      _ref: string;
    };
    blurDataUrl?: string;
    fullAsset?: {
      metadata?: {
        lqip?: string;
      };
    };
  };
  linkText?: string;
  linkUrl?: string;
  image?: {
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
  };
}

export type CardGridType = {
  _key: string;
  _type: "cardGrid";
  heading?: string;
  caption?: string;
  description?: string;
  style?: "light" | "dark";
  columns?: number;
  services?: CardItem[];
};

type CardGridProps = {
  block: CardGridType;
  index?: number;
};

export default function CardGrid({ block }: CardGridProps) {
  if (!block) return null;

  const {
    heading,
    caption,
    description,
    services = [],
    style = "light",
    columns = 3,
  } = block;

  // Generate appropriate column class based on columns setting
  const getColumnClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  // Check if we have cards to display
  if (!services.length) {
    return (
      <BlockContainer className="px-4 md:px-8">
        {caption && <div className="text-xs md:text-sm">{caption}</div>}
        {heading && (
          <div className="mb-2 text-xl font-semibold md:text-2xl">
            {heading}
          </div>
        )}
        {description && (
          <p className="mb-4 text-sm md:text-base">{description}</p>
        )}
        <div className="mt-4 rounded border border-gray-200 p-4 text-center text-gray-500 md:p-8">
          No cards available
        </div>
      </BlockContainer>
    );
  }

  return (
    <BlockContainer
      backgroundClassName={cn(
        style === "dark" && "bg-primary",
        style === "light" && "bg-muted",
      )}
      className={cn(
        "flex-col gap-4 px-4 py-6 md:gap-10 md:px-8 md:py-10",
        style === "dark" && "text-white",
      )}
    >
      <div className="flex max-w-full flex-col items-start gap-2 md:max-w-2xl md:items-center md:gap-4">
        {caption && (
          <div className="text-left text-xs md:text-center md:text-sm">
            {caption}
          </div>
        )}
        {heading && (
          <h2 className="text-left text-xl md:text-center md:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mx-auto max-w-full text-left text-sm md:max-w-2xl md:text-center md:text-lg">
            {description}
          </p>
        )}
      </div>
      <div className={cn("grid w-full gap-4 md:gap-6", getColumnClass())}>
        {services.map((service) => {
          if (!service?._id) return null;

          return (
            <article
              key={service._id}
              className={cn(
                "flex h-auto flex-col justify-between rounded-lg p-4 md:h-52 md:flex-row md:p-6",
                style === "light" && "bg-white",
                style === "dark" && "bg-primary-foreground/10",
              )}
            >
              <section className="flex flex-col md:pr-4">
                {service.title && (
                  <h3 className="text-base md:text-xl">{service.title}</h3>
                )}

                {service.summary && (
                  <p
                    className={cn(
                      "mb-4 flex-grow text-sm md:text-base",
                      style === "dark" && "text-white",
                      style === "light" && "text-gray-600",
                    )}
                  >
                    {service.summary}
                  </p>
                )}

                {service.description && (
                  <p
                    className={cn(
                      "mb-4 flex-grow text-sm md:hidden md:text-base",
                      style === "dark" && "text-white",
                      style === "light" && "text-gray-600",
                    )}
                  >
                    {service.description}
                  </p>
                )}

                {service.linkText && service.linkUrl && (
                  <div className="mt-auto pt-2">
                    <Link
                      href={service.linkUrl}
                      className={cn(
                        "inline-block text-xs underline md:text-sm",
                        style === "dark" && "text-white",
                        style === "light" && "text-gray-400",
                      )}
                    >
                      {service.linkText}
                    </Link>
                  </div>
                )}
              </section>
              {service.icon?.asset?._ref && (
                <div className="relative mt-4 aspect-square w-12 md:mt-0 md:w-16">
                  <Image
                    src={urlForImage(service.icon)?.url() as string}
                    alt={service.icon.alt || service.title || "Card image"}
                    fill
                    className="object-contain p-2 md:p-3"
                    placeholder="blur"
                    blurDataURL={
                      service.image?.blurDataUrl ||
                      service.image?.fullAsset?.metadata?.lqip ||
                      ""
                    }
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </BlockContainer>
  );
}
