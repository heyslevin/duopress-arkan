import { SanityImageHotspot, SanityImageCrop } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type Gallery = {
  _key: string;
  _type: "gallery";
  title?: string;
  gallery: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "galleryImage";
    _key: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "galleryImage";
      _key: string;
      imageUrl: string | null;
      blurDataUrl: string | null;
    };
  }> | null;
};

type GalleryProps = {
  block: Gallery;
  index: number;
};

export default function Gallery({ block }: GalleryProps) {
  if (!block) return null;

  const hasGallery =
    block.gallery && Array.isArray(block.gallery) && block.gallery.length > 0;

  return (
    <div className="container px-4 py-6 md:px-8 md:py-10">
      {block.title && <div className="text-xl md:text-2xl">{block.title}</div>}

      {hasGallery && (
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {block.gallery.map(({ image }) => {
            if (!image?.imageUrl || !image?._key) return null;

            return (
              <div className="relative aspect-square" key={image._key}>
                <Image
                  className="object-cover"
                  src={image.imageUrl}
                  alt={image.alt || "Gallery image"}
                  fill={true}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
