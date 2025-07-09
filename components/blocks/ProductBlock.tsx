"use client";

import { Image } from "next-sanity/image";
import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";
import {
  ProductBlock as ProductBlockType,
  Products as ProductsType,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Button } from "../ui/button";
import ResolvedLink from "../ResolvedLink";
import StyledResolvedLink from "../StyledResolvedLink";

interface ProductsProps {
  block: ProductBlockType & {
    products: ProductsType[];
  };
  index: number;
}

export default function Products({ block, index }: ProductsProps) {
  if (!block) return null;
  console.log({ productBlock: block.products[0] });

  const productsLength = block.products.length;

  return (
    <>
      {block.style === "compact" && (
        <BlockContainer
          backgroundClassName="bg-primary"
          className="flex-col items-start gap-6 px-4 py-6 text-white md:gap-8"
        >
          {/* Heading Section */}
          <section className="flex w-full flex-col gap-4">
            <h3 className="text-sm md:text-base">{block.caption}</h3>
            <div className="flex w-full flex-col gap-6 md:flex-row">
              <h2 className="w-2/3 text-balance text-3xl md:text-6xl">
                {block.heading}
              </h2>
              <p className="w-1/2 text-balance text-base md:text-xl">
                {block.text}
              </p>
            </div>
          </section>

          {/* Products Section */}
          <section
            className={cn(
              "grid w-full gap-8",
              productsLength > 1
                ? `grid-cols-1 md:grid-cols-${productsLength}`
                : "md:grid-cols-1",
            )}
          >
            {block.products.map((product) => {
              const button = {
                link: product.link,
                text: "Solicita tu Crédito",
              };
              return (
                <div
                  className="relative flex w-full flex-col justify-between gap-10 rounded-lg bg-accent-foreground p-4 text-primary md:gap-20 md:p-5"
                  key={product._id}
                >
                  <div className="absolute bottom-0 right-0 top-0 m-auto h-32 w-32 md:h-44 md:w-44">
                    <div className="relative h-full w-full">
                      <Image
                        src={urlForImage(product.image).url()}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <section className="flex flex-col gap-3 md:gap-4">
                    <h4 className="text-3xl md:text-5xl">{product.title}</h4>
                    <p className="max-w-[20ch] text-balance text-base md:text-xl">
                      {product.tagline}
                    </p>
                  </section>
                  <section className="flex flex-col gap-3 md:gap-4">
                    <p className="max-w-[30ch] text-balance text-xs text-gray-500 md:text-sm">
                      {product.idealText}
                    </p>
                    <div className="flex flex-col gap-1">
                      {product.clientTypes.map((clientType) => (
                        <div
                          className="flex flex-row items-center gap-2"
                          key={clientType._key}
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded-full md:h-6 md:w-6">
                            <Image
                              src={urlForImage(clientType.icon).url()}
                              alt={clientType.title}
                              width={80}
                              height={80}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {clientType.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row gap-2 md:mt-5">
                      <StyledResolvedLink button={button} />
                    </div>
                  </section>
                </div>
              );
            })}
          </section>
        </BlockContainer>
      )}
      {block.style === "full" && (
        <BlockContainer
          backgroundClassName="bg-primary"
          className="flex-col items-start gap-6 px-4 py-6 text-white md:gap-8 md:px-8 md:py-10"
        >
          {/* Heading Section */}
          <section className="flex flex-col gap-4">
            <h3 className="text-sm md:text-base">{block.caption}</h3>
            <div className="flex flex-col md:flex-row">
              <h2 className="text-balance text-3xl md:text-6xl">
                {block.heading}
              </h2>
              <p className="text-balance text-base md:text-xl">{block.text}</p>
            </div>
          </section>

          {/* Products Section */}
          <section
            className={cn(
              "grid w-full gap-8",
              productsLength > 1
                ? `grid-cols-1 md:grid-cols-${productsLength}`
                : "md:grid-cols-1",
            )}
          >
            {block.products.map((product) => {
              const button = {
                link: product.link,
                text: "Más información",
              };
              return (
                <div
                  className="relative flex w-full flex-col justify-between gap-10 rounded-lg bg-muted p-4 text-primary md:gap-12 md:p-5"
                  key={product._id}
                >
                  <div className="absolute right-0 top-0 h-36 w-36 p-4 md:h-40 md:w-40">
                    <div className="relative h-full w-full">
                      <Image
                        src={urlForImage(product.image).url()}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <section className="flex flex-col gap-3 md:gap-4">
                    <h4 className="text-3xl md:text-5xl">{product.title}</h4>
                    <p className="max-w-[20ch] text-balance text-base md:text-xl">
                      {product.tagline}
                    </p>
                  </section>
                  <div className="flex flex-row gap-2">
                    <StyledResolvedLink style="maxWidth" button={button} />
                  </div>
                  {/* Benefits Section */}
                  <section className="flex flex-col gap-4">
                    <p className="max-w-[30ch] text-balance text-xs text-primary-foreground md:text-sm">
                      Beneficios:
                    </p>
                    {product.benefits.map((benefit) => (
                      <div
                        className="flex flex-row items-center gap-2"
                        key={benefit._key}
                      >
                        <div className="flex aspect-square h-10 items-center justify-center rounded-sm bg-accent p-2">
                          <Image
                            src={urlForImage(benefit.icon).url()}
                            alt={benefit.icon?.alt || ""}
                            width={40}
                            height={40}
                          />
                        </div>
                        <p className="max-w-[30ch] text-balance text-base leading-tight text-gray-700">
                          {benefit.text}
                        </p>
                      </div>
                    ))}
                  </section>
                  <section className="flex flex-col gap-3 md:gap-2">
                    <p className="max-w-[30ch] text-balance text-xs text-primary-foreground md:text-sm">
                      Ideal para:
                    </p>
                    <div className="flex flex-row gap-1">
                      {product.clientTypes.map((clientType) => (
                        <p
                          className="rounded-sm border border-accent bg-white/70 px-2 py-1 text-sm text-primary-foreground"
                          key={clientType._key}
                        >
                          {clientType.title}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>
              );
            })}
          </section>
        </BlockContainer>
      )}
    </>
  );
}
