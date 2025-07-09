import { type PortableTextBlock } from "next-sanity";

import PortableText from "@/components/PortableText";
import { InfoSection as InfoSectionType } from "@/sanity.types";
import BlockContainer from "../BlockContainer";

type InfoProps = {
  block: InfoSectionType;
  index: number;
};

export default function InfoSection({ block }: InfoProps) {
  if (!block) return null;

  return (
    <BlockContainer backgroundClassName="bg-muted">
      <div className="flex w-full flex-col items-center text-center text-primary">
        {block?.caption && (
          <span className="mb-4 mt-2 block text-base">{block.caption}</span>
        )}

        {block?.heading && (
          <h2 className="max-w-xl text-balance text-3xl lg:text-6xl">
            {block.heading}
          </h2>
        )}

        {block?.content?.length > 0 && (
          <div className="prose prose-a:text-red-500 mt-2 md:mt-4">
            <PortableText
              className="text-sm md:text-base"
              value={block.content as PortableTextBlock[]}
            />
          </div>
        )}
      </div>
    </BlockContainer>
  );
}
