import { Link, SanityImageCrop, SanityImageHotspot } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type TextAndImage = {
  _key: string;
  _type: "textAndImage";
  title?: string;
  caption?: string;
  heading?: string;
  text?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  button?: {
    buttonText?: string;
    link?: Link;
  };
};

type TextAndImageProps = {
  index: number;
  block: TextAndImage;
};

export default function TextAndImage({ block }: TextAndImageProps) {
  if (!block) return null;

  const source = urlForImage(block.image)?.url();

  return (
    <div className="container px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-4 md:w-1/2">
          {block.caption && (
            <div className="text-sm md:text-base">{block.caption}</div>
          )}
          {block.heading && (
            <div className="text-2xl md:text-4xl">{block.heading}</div>
          )}
          {block.text && (
            <div className="text-base md:text-lg">{block.text}</div>
          )}
          {block.button?.buttonText && (
            <a href="">
              <button className="mt-4 rounded-full bg-secondary px-6 py-2 text-sm md:text-base">
                {block.button.buttonText}
              </button>
            </a>
          )}
        </div>
        {block.image && (
          <div className="relative h-48 w-full md:h-64">
            <Image
              className="object-cover"
              fill={true}
              src={urlForImage(block.image)?.url() as string}
              alt={block.image?.alt as string}
            />
          </div>
        )}
      </div>
    </div>
  );
}
