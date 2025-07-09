import React from "react";

import Cta from "@/components/blocks/Cta";
import Info from "@/components/blocks/InfoSection";
import Hero from "@/components/blocks/Hero";
import Gallery from "@/components/blocks/Gallery";
import Paragraph from "@/components/blocks/ParagraphSection";
import TextAndImage from "@/components/blocks/TextAndImage";
import Form from "@/components/blocks/Form";
import Metrics from "@/components/blocks/Metrics";
import Accordion from "@/components/blocks/Accordion";
import TestBlock from "@/components/blocks/TestBlock";
import ImagesCarousel from "@/components/blocks/ImagesCarousel";
import ProductBlock from "./blocks/ProductBlock";
import TabsDoubleImage from "@/components/blocks/TabsDoubleImage";
import { Steps } from "@/components/blocks/Steps";
import { ProductDetails } from "@/components/blocks/ProductDetails";
import MiniGalleries from "./blocks/MiniGalleries";
import { Documentation } from "@/components/blocks/Documentation";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _id: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
};

//Add your blocks here
const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
  hero: Hero,
  tabsDoubleImage: TabsDoubleImage,
  gallery: Gallery,
  paragraph: Paragraph,
  textAndImage: TextAndImage,
  form: Form,
  metrics: Metrics,
  accordion: Accordion,
  testBlock: TestBlock,
  imagesCarousel: ImagesCarousel,
  productBlock: ProductBlock,
  stepsType: Steps,
  productDetailsType: ProductDetails,
  miniGalleries: MiniGalleries,
  documentationType: Documentation,
};

export default function BlockRenderer({ block, index }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return React.createElement(Blocks[block._type], {
      key: block._id,
      block: block,
      index: index,
    });
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div
        className="w-full rounded bg-gray-100 p-20 text-center text-gray-500"
        key={block._id}
      >
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._id },
  );
}
