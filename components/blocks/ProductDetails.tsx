import BlockContainer from "../BlockContainer";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText } from "next-sanity";
import { PortableParagraph } from "../PortableParagraph";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown } from "lucide-react";
import { getImageDimensions } from "@sanity/asset-utils";
import _ from "lodash";
import { cn } from "@/lib/utils";

interface ProductDetailsType {
  _key: string;

  _type: "productDetailsType";
  sectionId?: string;
  heading?: string;
  caption?: string;
  product: {
    _id: string;
    backgroundColor: "sand" | "pale-green" | "green";
    _type: "products";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    orderRank?: string;
    title: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: any;
      crop?: any;
      _type: "image";
    } | null;
    tagline: string | null;
    summary: string | null;
    description: string | null;
    idealText: string | null;
    clientTypes: Array<{
      title?: string;
      icon?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
        };
        hotspot?: any;
        crop?: any;
        alt?: string;
        _type: "image";
      };
      _type: "clientType";
      _key: string;
    }> | null;
    benefits: Array<{
      text?: string;
      icon?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
        };
        hotspot?: any;
        crop?: any;
        alt?: string;
        _type: "image";
      };
      _type: "benefit";
      _key: string;
    }> | null;
    requisitos: Array<string> | null;
    intereses: any | null;
  };
}

export function ProductDetails({ block }: { block: ProductDetailsType }) {
  console.log({ productId: block });
  return (
    <BlockContainer
      id={_.kebabCase(block.sectionId)}
      className="px-4 py-6 md:px-8 md:py-4"
    >
      <section
        className={cn(
          "flex w-full flex-col gap-6 rounded-xl bg-extra-brown p-4 md:flex-row md:gap-8 md:p-8",
          block.product.backgroundColor === "sand" && "bg-[#F1EEE0]",
          block.product.backgroundColor === "pale-green" && "bg-[#01452A]/10",
          block.product.backgroundColor === "green" && "bg-[#55C995]/10",
        )}
      >
        {/* Left */}
        <section className="relative flex w-full flex-col gap-4 md:w-1/2 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              <h2 className="mb-0 max-w-lg text-balance text-2xl text-secondary md:text-5xl">
                {block.product.title}
              </h2>
              <h2 className="max-w-lg text-balance text-2xl text-primary md:text-5xl">
                {block.product.tagline}
              </h2>
            </div>
            <p className="max-w-lg text-pretty text-base text-gray-600 md:text-xl">
              {block.product.summary}
            </p>
          </div>
          <div className="mb-auto flex flex-col gap-2">
            <p className="text-sm md:text-base">Ideal para:</p>
            <div className="flex flex-row flex-wrap gap-1">
              {block.product.clientTypes.map((clientType) => (
                <p
                  key={clientType._key}
                  className="rounded-sm border border-accent bg-white/60 px-2 py-1 text-xs text-primary md:text-sm"
                >
                  {clientType.title}
                </p>
              ))}
            </div>
          </div>
          <div className="items-center justify-center max-sm:flex max-sm:w-full md:relative md:h-72 md:w-72">
            <div className="relative h-full w-full">
              <Image
                src={urlForImage(block.product.image).url()}
                alt={block.product.image?.alt || ""}
                className="object-contain object-left"
                fill
              />
            </div>
          </div>
        </section>
        {/* Right */}
        <section className="flex w-full flex-col gap-6 md:w-1/2 md:gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="text-xs text-primary md:text-sm">Que es?</h4>
            <p className="text-sm text-gray-600 md:text-xl">
              {block.product.description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs text-primary md:text-sm">Beneficios</h3>
            <div className="flex flex-col gap-2">
              {block.product.benefits.map((benefit) => (
                <div
                  key={benefit._key}
                  className="flex flex-row items-center gap-2"
                >
                  <div className="flex aspect-square h-6 items-center justify-center rounded-sm bg-accent p-1 md:h-10 md:p-2">
                    <Image
                      src={urlForImage(benefit.icon).url()}
                      alt={benefit.icon?.alt || ""}
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-balance text-sm leading-tight text-gray-700 md:text-xl">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-primary md:text-sm">Requisitos</h3>
            <div className="flex flex-col gap-2">
              {block.product.requisitos.map((requisito, index) => (
                <p
                  key={index}
                  className="border-b border-gray-300 py-1 text-sm text-gray-600 md:text-lg"
                >
                  {requisito}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="rounded-md border border-accent"
              >
                <AccordionTrigger className="p-3 text-xs text-primary md:p-4 md:text-base">
                  <p>Intereses y Comisiones</p>
                  <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200 md:h-4 md:w-4" />
                </AccordionTrigger>
                <AccordionContent className="p-3 md:p-4">
                  <PortableText
                    components={PortableParagraph as any}
                    value={block.product.intereses as any}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </section>
    </BlockContainer>
  );
}
