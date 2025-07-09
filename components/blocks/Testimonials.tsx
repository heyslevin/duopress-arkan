import { CarouselContent, CarouselItem } from "../ui/carousel";

import BlockContainer from "../BlockContainer";
import { Carousel, CarouselPrevious, CarouselNext } from "../ui/carousel";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils";

export type Testimonials = {
  _key: string;
  _type: "testimonials";
  heading?: string;
  caption?: string;
  testimonials?: Array<{
    _key: string;
    name?: string;
    role?: string;
    caption?: string;
    text?: string;
    image?: any;
  }>;
  style?: "light" | "dark";
};

type TestimonialsProps = {
  block: Testimonials;
  index?: number;
};

export default function Testimonials({ block }: TestimonialsProps) {
  if (!block) return null;

  const testimonials = block.testimonials || [];
  const style = block.style || "light";

  return (
    <div
      className={`container px-4 py-6 md:px-8 md:py-10 ${style === "dark" ? "bg-primary text-white" : "bg-muted"}`}
    >
      {block.heading && (
        <h2 className="text-xl md:text-2xl">{block.heading}</h2>
      )}
      {block.caption && (
        <p className="mt-2 text-sm md:mt-4 md:text-base">{block.caption}</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._key}
            className={`rounded-lg p-4 ${
              style === "dark" ? "bg-primary-foreground/10" : "bg-white"
            }`}
          >
            {testimonial.text && (
              <p className="text-sm md:text-base">{testimonial.text}</p>
            )}
            <div className="mt-4 flex items-center gap-3">
              {testimonial.image && (
                <div className="relative h-10 w-10 md:h-12 md:w-12">
                  <Image
                    src={urlForImage(testimonial.image).url()}
                    alt={testimonial.name || "Testimonial"}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                {testimonial.name && (
                  <p className="text-sm font-medium md:text-base">
                    {testimonial.name}
                  </p>
                )}
                {testimonial.role && (
                  <p className="text-xs text-gray-500 md:text-sm">
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
