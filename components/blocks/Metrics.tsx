import BlockContainer from "../BlockContainer";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export type Metrics = {
  _key: string;
  _type: "metrics";
  title?: string;
  caption?: string;
  heading?: string;
  text?: string;
  metrics?: Array<{
    heading?: string;
    caption?: string;
    text?: string;
    bigNumber?: string;
    title?: string;
    description?: string;
    _type: "metricItem";
    _key: string;
  }>;
};

type MetricProps = {
  block: Metrics;
  index: number;
};

export default function Metrics({ block }: MetricProps) {
  if (!block) return null;

  const hasMetrics =
    block.metrics && Array.isArray(block.metrics) && block.metrics.length > 0;
  const showNavigation = block.metrics && block.metrics.length > 4;

  if (!hasMetrics) return null;

  return (
    <BlockContainer className="isolate px-0 py-6 md:py-10">
      <div className="w-full">
        <Carousel opts={{ align: "start" }} className="w-full">
          <div className="mb-4 flex w-full items-center justify-between md:mb-8">
            {block.heading && (
              <h2 className="text-xl tracking-tight md:text-3xl">
                {block.heading}
              </h2>
            )}
            {showNavigation && (
              <div className="hidden w-fit gap-2 md:flex">
                <CarouselPrevious className="relative left-auto top-auto transform-none" />
                <CarouselNext className="relative right-auto top-auto transform-none" />
              </div>
            )}
          </div>
          <CarouselContent className="max-sm:ml-0 max-sm:pl-4">
            {block.metrics?.map((metric) => {
              if (!metric?._key) return null;

              return (
                <CarouselItem
                  key={metric._key}
                  className="ml-0 basis-[85%] pl-8 max-sm:first-of-type:pl-0 max-sm:last-of-type:pr-4 md:basis-1/4"
                >
                  <article className="flex h-48 flex-col rounded-lg bg-accent-foreground p-4 text-primary md:h-48">
                    <div className="mb-auto">
                      <h4 className="text-5xl font-medium tracking-tighter md:text-7xl">
                        {metric.heading || "0"}
                      </h4>
                      {metric.caption && (
                        <p className="text-xs md:text-sm">{metric.caption}</p>
                      )}
                    </div>
                    {metric.text && (
                      <p className="text-sm leading-tight md:text-base">
                        {metric.text}
                      </p>
                    )}
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </BlockContainer>
  );
}
