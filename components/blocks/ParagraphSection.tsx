import { PortableText } from "next-sanity";
import { type PortableTextBlock } from "next-sanity";
import { PortableParagraph } from "../PortableParagraph";

//Pending type

export default function ParagraphSection({ block }: any) {
  if (!block) return null;

  return (
    <div className="container">
      {block.title && <div className="">{block.title}</div>}

      {block.textBlock && block.textBlock.length > 0 && (
        <PortableText
          components={PortableParagraph as any}
          value={block.textBlock as PortableTextBlock[]}
        />
      )}
    </div>
  );
}
