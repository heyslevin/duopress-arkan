"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils";

// Define the minimal required structure for Sanity images
interface SanityImageAsset {
  _ref: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

interface Client {
  _key: string;
  clientName?: string;
  imageUrl?: Partial<SanityImage> | string;
  blurDataUrl?: string;
}

interface ClientsCarouselProps {
  content: Client[];
  theme?: "dark" | "light";
}

export default function ClientsCarousel({
  content,
  theme = "dark",
}: ClientsCarouselProps) {
  const clients = content;
  return (
    <div className="w-full">
      <h3
        className={cn(
          "mb-4 text-center font-body text-base",
          theme === "dark" && "text-white",
          theme === "light" && "text-black",
        )}
      >
        Some of our clients
      </h3>

      <Carousel
        opts={{
          loop: true,
          containScroll: "keepSnaps",
          align: "start",
        }}
        plugins={[Autoplay()]}
        className="relative"
      >
        <CarouselContent
          className={cn(clients.length <= 6 && "justify-center")}
        >
          {clients.map((client) => (
            <CarouselItem key={client._id} className="basis-1/3 md:basis-1/6">
              <div
                className={cn(
                  "relative flex h-24 items-center justify-center rounded-md",
                  theme === "dark" && "bg-white/10",
                  theme === "light" && "bg-white",
                )}
              >
                {client.imageUrl && (
                  <Image
                    className={cn(
                      "object-contain p-4",
                      theme === "dark" && "brightness-0 invert",
                      theme === "light" && "brightness-0",
                    )}
                    // Handle both string paths and Sanity images
                    src={
                      typeof client.imageUrl === "string"
                        ? client.imageUrl
                        : // @ts-ignore - We know clientLogo exists in this block
                          urlForImage(client.logos).url()
                    }
                    alt={client.clientName || "Client logo"}
                    fill
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
