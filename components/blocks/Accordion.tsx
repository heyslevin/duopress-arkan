import { Image } from "next-sanity/image";
import BlockContainer from "../BlockContainer";
import {
  Accordion as AccordionComponent,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { urlForImage } from "@/sanity/lib/utils";
import { ChevronDownIcon } from "@sanity/icons";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  _id?: string;
  _key: string;
  _type: "item";
  title?: string;
  description?: string;
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
};

type AccordionBlock = {
  _key: string;
  _type: "accordion";
  sectionId?: string;
  heading?: string;
  caption?: string;
  text?: string;
  accordionItems?: AccordionItem[];
  theme?: string;
  images?: Array<{
    _key: string;
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
    _type: "image";
  }>;
};

type AccordionProps = {
  index: number;
  block: AccordionBlock;
};

export default function Accordion({ block }: AccordionProps) {
  const content = block;
  const accordionItems = block?.accordionItems || [];

  // Add guardrail for empty content
  if (!accordionItems || accordionItems.length === 0) {
    return (
      <div className="flex h-auto w-full scroll-mt-10 flex-col items-center justify-center bg-zinc-200 px-4 py-12 md:px-28 md:py-24">
        <div className="text-center text-gray-500">
          No accordion content available
        </div>
      </div>
    );
  }

  return (
    <BlockContainer className="relative isolate px-4 py-6 md:px-8 md:py-12">
      {block.theme === "decoration" && (
        <div className="absolute inset-0 m-auto grid h-full w-full place-content-center max-sm:hidden">
          {block.images?.map(
            (image) =>
              image && (
                <div className="absolute inset-0 m-auto h-72 w-72 first-of-type:-translate-x-[-170%] first-of-type:translate-y-40 last-of-type:-translate-y-12 last-of-type:translate-x-[-180%]">
                  <div className="relative h-full w-full">
                    <Image
                      key={image._key}
                      src={urlForImage(image).url()}
                      alt={image.alt}
                      className="object-contain"
                      fill
                    />
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      <div className="z-10 flex w-full flex-col items-center justify-center gap-4 font-body font-normal md:gap-6">
        <div className="flex flex-col items-center justify-start gap-3 md:w-1/2 md:gap-6 md:py-10">
          {content?.caption && (
            <div className="text-xs md:text-base">{content.caption}</div>
          )}
          {content?.heading && (
            <h2 className="text-pretty text-xl text-primary-foreground md:text-4xl">
              {content.heading}
            </h2>
          )}
          {content?.text && (
            <p className="inline w-full text-left text-sm md:w-10/12 md:text-xl">
              {content.text}
            </p>
          )}
        </div>

        <div className="mt-4 h-full w-full md:mt-0 md:w-1/2">
          <AccordionComponent
            className="flex flex-col gap-2"
            type="single"
            collapsible
          >
            {accordionItems.map((item: AccordionItem) => {
              if (!item) return null;

              return (
                <AccordionItem
                  key={item._id || item._key}
                  value={item._id || item._key || ""}
                  className="rounded-md bg-accent-foreground p-2 hover:text-gray-700 md:p-3"
                >
                  <AccordionTrigger className="p-2 text-base text-primary md:text-lg">
                    <p className="max-w-md text-left">{item.title}</p>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="p-2 text-xs text-gray-600 md:text-lg">
                    {item.description || "No description available"}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionComponent>
        </div>
      </div>
    </BlockContainer>
  );
}
