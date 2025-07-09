import { Suspense } from "react";

import ResolvedLink from "@/components/ResolvedLink";
import { CallToAction, Settings } from "@/sanity.types";
import BlockContainer from "@/components/BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import StyledResolvedLink from "../StyledResolvedLink";
import { cn } from "@/lib/utils";

type Product = any; // Replace with your actual Product type if available

type CallToActionBlock = CallToAction & {
  products: Product[];
  settings: Settings;
};

type CtaProps = {
  block: CallToActionBlock;
  index: number;
};

export default function CTA({
  block,
  products = [],
  settings,
}: CtaProps & { products?: any[]; settings?: any }) {
  if (!block) return null;

  console.log({ block: block.button });

  const hasLink = block.button?.link && block.button?.text;
  // Prepare images for the row
  const images = [
    block.products[0]?.image,
    block.products[1]?.image,
    block.settings?.brandAssets?.secondaryLogo,
    block.products[2]?.image,
  ];
  const bgColors = [
    "bg-extra-green",
    "bg-extra-brown",
    "bg-accent",
    "bg-extra-gray",
  ];

  return (
    <BlockContainer
      backgroundClassName="bg-muted"
      className="px-4 md:px-8 md:py-10"
    >
      {block.caption && (
        <section className="flex flex-col items-center gap-3 text-center md:gap-6">
          {block.caption && (
            <h3 className="max-w-md rounded-full border border-accent bg-accent/20 p-1 px-2 text-center text-sm tracking-tight text-primary md:text-base">
              {block.caption}
            </h3>
          )}
          {block.heading && (
            <h2 className="max-w-md text-3xl tracking-tight text-primary md:text-5xl">
              {block.heading}
            </h2>
          )}
          {block.text && (
            <p className="max-w-md text-center text-base text-gray-600 md:text-lg">
              {block.text}
            </p>
          )}
          {/* Four image row */}
          <div className="flex w-full flex-row flex-wrap justify-center gap-4 md:gap-2">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative flex h-14 w-14 items-center rounded-lg md:h-40 md:w-40 ${bgColors[index]}`}
              >
                {img ? (
                  <Image
                    src={urlForImage(img).url() as string}
                    alt="block illustration"
                    className={cn(
                      "object-contain p-3 md:p-5",
                      index === 2 && "md:p-10",
                    )}
                    fill
                  />
                ) : (
                  <div className="h-32 w-32 rounded bg-gray-200 md:h-40 md:w-40" />
                )}
              </div>
            ))}
          </div>
          {hasLink && (
            <div className="flex flex-row gap-2">
              <StyledResolvedLink button={block.button} />
            </div>
          )}
        </section>
      )}

      {!block.caption && (
        <section className="flex flex-col items-center gap-6 md:gap-8">
          <div className="relative h-12 w-12 md:h-16 md:w-16">
            <Image
              src={
                urlForImage(
                  block.settings?.brandAssets?.secondaryLogo,
                ).url() as string
              }
              alt="block illustration"
              className="object-contain"
              fill
            />
          </div>
          {block.heading && (
            <h2 className="max-w-md text-balance text-center text-3xl tracking-tight text-primary md:text-5xl">
              {block.heading}
            </h2>
          )}
          {block.text && (
            <p className="max-w-md text-balance text-center text-base text-gray-600 md:text-lg">
              {block.text}
            </p>
          )}

          {hasLink && (
            <div className="flex flex-row gap-2">
              <StyledResolvedLink button={block.button} />
            </div>
          )}
        </section>
      )}
    </BlockContainer>
  );
}
