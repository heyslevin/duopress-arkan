import { animateIn, splitGalleryData, urlForImage } from "@/sanity/lib/utils";
import styles from "@/components/blocks/styles/heroStyles.module.css";
import { Image } from "next-sanity/image";
import { ArrowRight } from "lucide-react";
import BlockContainer from "../BlockContainer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { PortableText } from "next-sanity";
import { PortableParagraph } from "../PortableParagraph";
import SectionContainer from "../SectionContainer";
import { cn } from "@/lib/utils";
import { FadeCarousel } from "../FadeCarousel";
import Autoplay from "embla-carousel-autoplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import HoverTabs from "../HoverTabs";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TestBlock({ block }: any) {
  if (!block) return null;

  const image = block.logo;
  const gallery = block.gallery;
  const tabs = block.tabs;
  const metrics = block.metrics;
  const iniciatives = block.iniciatives;
  const tools = block.tools;
  const names = block.names;
  const testimonials = block.testimonials;
  const footer = block.footer;
  const blackLogo = block.footer.logo;
  const portafolio = block.portafolio;

  if (
    !gallery ||
    !tabs ||
    !metrics ||
    !iniciatives ||
    !tools ||
    !names ||
    !testimonials ||
    !footer ||
    !portafolio
  ) {
    return null;
  }

  const [gallery1, gallery2, gallery3, gallery4] = splitGalleryData(
    block.portafolio.gallery,
    4,
  );

  const [gallery5, gallery6] = splitGalleryData(block.portafolio.gallery, 2);

  // First, define the possible color keys
  type ColorKey = "blue" | "red" | "green" | "black";

  // Define the structure of the color styles
  type ColorStyle = {
    [key: string]: string;
  };

  // Define the complete color styles object type
  type ColorStyles = {
    [K in ColorKey]: ColorStyle;
  };

  // Now define the color styles with the type
  const COLOR_STYLES: ColorStyles = {
    blue: {
      normal: "bg-[#0000FF]",
      dark: "bg-blue-950",
    },
    red: {
      normal: "bg-[#FF2600]",
      dark: "bg-red-800",
    },
    green: {
      normal: "bg-[#226452]",
      dark: "bg-green-800",
    },
    black: {
      normal: "bg-stone-800",
      dark: "bg-black",
    },
  };

  return (
    <main className="relative flex flex-col items-center bg-[#EBEBEB]">
      {/* Hero block */}

      {/* Overflow hides background pattern */}
      <BlockContainer
        size="lg"
        backgroundClassName="bg-[#1868FF]"
        className="relative overflow-hidden px-0 py-2 md:px-0 md:py-10"
      >
        {/* Background */}

        <div className="absolute top-0 h-lvh w-full md:h-screen">
          <div className={`${styles.row} ${styles["row-1"]} `}></div>
          <div className={`${styles.row} ${styles["row-2"]} `}></div>
          <div className={`${styles.row} ${styles["row-3"]} `}></div>
          <div className={`${styles.row} ${styles["row-4"]} `}></div>
          <div className={`${styles.row} ${styles["row-5"]} `}></div>
          <div className={`${styles.row} ${styles["row-6"]} `}></div>
          <div className={`${styles.row} ${styles["row-7"]} `}></div>
          <div className={`${styles.row} ${styles["row-8"]} `}></div>
          <div className={`${styles.row} ${styles["row-9"]} `}></div>
          <div className={`${styles.row} ${styles["row-10"]} `}></div>
        </div>

        {/* Content */}

        <div className="relative mx-1 flex h-full w-full p-4 md:mx-10 md:p-0">
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {/* Left block */}

            <section className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 flex h-full min-h-80 flex-col justify-between rounded-lg bg-black text-white">
              <div className="p-5">
                <h1 className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 motion-delay-500 flex h-full px-0 text-[3.5rem] font-black leading-[3rem] tracking-tight md:text-[6vw] md:leading-[5vw]">
                  WRAPPED 2024
                </h1>
              </div>
              <nav className="text-xl md:text-2xl">
                <Link href="#stats" className="group">
                  <div className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 motion-delay-[700ms] flex items-center justify-between border-y px-5 py-2">
                    <p className="">The Stats</p>
                    <ArrowRight className="group-hover:motion-preset-wobble-md" />
                  </div>
                </Link>
                <Link href="#initiatives" className="group">
                  <div className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 motion-delay-[900ms] flex items-center justify-between border-b px-5 py-2">
                    <p className="">Initiatives</p>
                    <ArrowRight className="group-hover:motion-preset-wobble-md" />
                  </div>
                </Link>
                <Link href="#tools" className="group">
                  <div className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 motion-delay-[1100ms] flex items-center justify-between px-5 py-2">
                    <p className="">Tools</p>
                    <ArrowRight className="group-hover:motion-preset-wobble-md" />
                  </div>
                </Link>
              </nav>
            </section>

            {/* Right Block */}

            <section className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 flex min-h-80 flex-col justify-between rounded-lg border border-white bg-none p-5 text-white">
              <div className="motion-translate-y-in-25 motion-blur-in-md motion-opacity-in-0 motion-delay-500 relative w-full">
                {image?.asset?._ref ? (
                  <Image
                    className="w-full"
                    src={urlForImage(image)?.url() as string}
                    alt={image?.alt || ""}
                    width={100}
                    height={50}
                  />
                ) : null}
              </div>
              <div className="motion-preset-slide-up-md motion-blur-in-md motion-delay-1500 text-balance text-2xl md:text-3xl">
                12 years making things easy to understand, and impossible to
                ignore.
              </div>
            </section>
          </div>
        </div>
      </BlockContainer>

      {/* Paragraph Section */}

      <BlockContainer className="px-5 py-24 md:px-0">
        <div className="w-full md:w-1/2 md:py-8">
          <h2 className="text-xl md:text-2xl">
            This past year has been a whirlwind of change—fast-paced, dynamic,
            and exhilarating. As creatives, we don't just adapt to change; we
            embrace it and help shape it. In an ever-evolving landscape, our
            mission remains clear: to help brands rise above the noise, craft
            stories that truly resonate, and equip them with the tools they need
            to grow and transform.
            <br></br>
            <br></br>2024 marked our 12th year of building brands and sharing
            their stories. We're profoundly grateful for the opportunity to
            collaborate with clients tackling ambitious challenges and for the
            chance to do what we love: showing the world the transformative
            power of great design.
          </h2>
        </div>
      </BlockContainer>

      {/* Gallery */}

      <BlockContainer className="p-4">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="">
            {gallery.map((item: any) => {
              const image = item.image;

              return (
                <CarouselItem key={item._key} className="">
                  {image?.asset?._ref ? (
                    <div className="flex max-h-[800px] items-center overflow-hidden rounded-lg">
                      <Image
                        src={urlForImage(image)?.url() as string}
                        alt={image.alt}
                        width={2000}
                        height={1500}
                        placeholder="blur"
                        blurDataURL={image.fullAsset.metadata.lqip}
                      />
                    </div>
                  ) : null}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </BlockContainer>

      {/* Black Background Block */}

      <div className="intersect-once intersect:motion-opacity-in-0 flex w-full flex-col items-center justify-center bg-black">
        <SectionContainer
          id="stats"
          className="py-16 text-white md:py-28"
          title="The Stats"
          paragraph="Can we sum up and entire year in numbers? Maybe not, but we're sure as hell going to try. Let's talk numbers."
        />

        {/* Paragraph Block */}

        <BlockContainer className="w-10/12 py-2 pb-16 text-white md:mb-20 md:w-3/4">
          <PortableText
            components={PortableParagraph as any}
            value={block.blockContent}
          />
        </BlockContainer>
      </div>

      {/* Portfolio Block */}

      <BlockContainer className="md:px-10">
        <div className="flex w-full flex-col items-start justify-start gap-5 rounded-lg bg-white md:flex-row md:items-stretch md:p-4">
          <section className="mb-6 mt-6 flex w-full flex-col items-center px-5 text-2xl leading-tight tracking-tighter md:mb-0 md:mt-0 md:w-1/2 md:items-start md:px-0 md:text-3xl">
            <h3 className="">Portfolio Projects</h3>
            <h3 className="text-stone-400 md:mb-auto">A lot more to come!</h3>
            <h2 className="text-9xl font-medium md:text-[200px] md:leading-[8rem]">
              8
            </h2>
          </section>

          {/* Mobile Gallery */}

          <section className="flex md:hidden">
            <Carousel className="w-full overflow-visible" opts={{ loop: true }}>
              <CarouselContent className="overflow-visible">
                {gallery5.map((project: any) => {
                  const image = project.image;
                  return (
                    <CarouselItem key={project._key} className="basis-1/2">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <figcaption className="absolute bottom-0 mb-2 ml-2 flex flex-row rounded-full bg-white/30 p-2 px-3 text-black backdrop-blur-md">
                          <p className="whitespace-nowrap text-xs">
                            {project.client}&nbsp;
                          </p>
                          <p className="whitespace-nowrap text-xs text-stone-500">
                            · {project.industry}
                          </p>
                        </figcaption>
                        {image?.asset?._ref ? (
                          <Image
                            src={urlForImage(image)?.url() as string}
                            alt={image.alt}
                            width={2000}
                            height={2000}
                            placeholder="blur"
                            blurDataURL={image.fullAsset.metadata.lqip}
                          />
                        ) : null}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="mb-6 flex md:hidden">
            <Carousel
              className="w-full overflow-visible"
              opts={{ loop: true }}
              delay={6500}
            >
              <CarouselContent className="overflow-visible">
                {gallery6.map((project: any) => {
                  const image = project.image;
                  return (
                    <CarouselItem key={project._key} className="basis-1/2">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <figcaption className="absolute bottom-0 mb-2 ml-2 flex flex-row rounded-full bg-white/30 p-2 px-3 text-black backdrop-blur-md">
                          <p className="whitespace-nowrap text-xs">
                            {project.client}&nbsp;
                          </p>
                          <p className="whitespace-nowrap text-xs text-stone-500">
                            · {project.industry}
                          </p>
                        </figcaption>
                        {image?.asset?._ref ? (
                          <Image
                            src={urlForImage(image)?.url() as string}
                            alt={image.alt}
                            width={2000}
                            height={2000}
                            placeholder="blur"
                            blurDataURL={image.fullAsset.metadata.lqip}
                          />
                        ) : null}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </section>

          {/* Desktop Gallery */}

          <section className="hidden grid-cols-2 gap-4 md:grid md:w-1/2">
            <FadeCarousel items={gallery1} options={{ delay: 4200 }} />
            <FadeCarousel items={gallery2} options={{ delay: 9500 }} />
            <FadeCarousel items={gallery3} options={{ delay: 6200 }} />
            <FadeCarousel items={gallery4} options={{ delay: 5600 }} />
          </section>
        </div>
      </BlockContainer>

      {/* Industries Served */}

      <BlockContainer className="z-10 px-4 py-16 md:px-10 md:py-10">
        <section className="flex w-full flex-col border-stone-400 pt-2 md:gap-4 md:pt-8">
          <h3 className="mb-10 w-3/4 text-balance text-2xl leading-tight tracking-tight md:text-3xl">
            Industries we've served
          </h3>
          <HoverTabs tabs={tabs} />
        </section>
      </BlockContainer>

      {/* Metrics Carousel */}

      <BlockContainer className="isolate px-0 md:px-10 md:py-10">
        <div className="w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <div className="mb-8 flex w-full items-center justify-between px-4 md:px-0">
              <h2 className="text-2xl tracking-tight md:text-3xl">
                Weird numbers
              </h2>
              <div className="hidden w-fit gap-2 md:flex">
                <CarouselPrevious className="relative left-auto top-auto transform-none" />
                <CarouselNext className="relative right-auto top-auto transform-none" />
              </div>
            </div>
            <CarouselContent className="max-sm:ml-0 max-sm:pl-4">
              {metrics.map((metric: any) => {
                return (
                  <CarouselItem
                    key={metric._key}
                    className="ml-0 basis-[85%] pl-4 max-sm:first-of-type:pl-0 max-sm:last-of-type:pr-4 md:basis-1/4"
                  >
                    <article className="flex h-80 flex-col rounded-lg bg-stone-300 p-4 md:h-96">
                      <h4 className="mb-auto text-8xl font-medium tracking-tighter">
                        {metric.bigNumber}
                      </h4>
                      <p className="text-lg">{metric.title}</p>
                      <p className="text-lg leading-tight text-stone-500">
                        {metric.description}
                      </p>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </BlockContainer>

      {/* Iniciatives Section */}

      <SectionContainer
        id="initiatives"
        className=""
        title="Initiatives"
        paragraph="Each year, we push beyond design work to explore new ideas—and 2024 was no exception. Here's a look at our initiatives."
      />

      <BlockContainer className="flex-col gap-5 px-4 pb-24 md:px-10">
        {iniciatives.map((item: any) => {
          const image = item.image;

          return (
            <article
              key={item._key}
              className={cn(
                "flex w-full flex-col gap-2 rounded-lg bg-gray-800 p-2 md:flex-row md:gap-5 md:p-5",
                COLOR_STYLES[item.color as ColorKey].dark,
              )}
            >
              <section
                className={cn(
                  "flex flex-col justify-between rounded-lg bg-gray-300 p-4 md:h-[700px] md:w-1/2",
                  COLOR_STYLES[item.color as ColorKey].normal,
                )}
              >
                <h3 className="mb-10 text-4xl font-bold uppercase tracking-tighter text-white md:text-7xl md:leading-[4rem]">
                  {item.title}
                </h3>
                <p className="whitespace-pre-wrap text-sm text-white md:text-lg">
                  {item.description}
                </p>
              </section>
              <section className="aspect-square md:w-1/2">
                {image?.asset?._ref ? (
                  <Image
                    className="h-full rounded-lg object-cover"
                    src={urlForImage(image)?.url() as string}
                    alt={image?.alt || ""}
                    width={3000}
                    height={3000}
                    placeholder="blur"
                    blurDataURL={image.fullAsset.metadata.lqip}
                  />
                ) : null}
              </section>
            </article>
          );
        })}
      </BlockContainer>

      {/* Tools Section */}

      <SectionContainer
        id="tools"
        className=""
        title="Tools"
        paragraph="What tools keep our wheels turning? Alongside our daily go-tos, we're always on the hunt for new ways to design, collaborate, and communicate. Here's our current tool stack:"
      />

      <BlockContainer className="px-4 md:px-10">
        <article className="flex flex-col">
          {tools.map((toolGroup: any) => {
            return (
              <section
                key={toolGroup._key}
                className="mb-14 flex w-full flex-col border-t border-black py-2 md:mb-20 md:flex-row md:py-5"
              >
                {/* Left Side */}
                <div className="mb-8 flex w-full flex-col justify-start gap-6 md:mb-0 md:w-1/2">
                  <h4 className="text-xl tracking-tight md:text-3xl">
                    {toolGroup.title}
                  </h4>
                  <p className="text-balance text-sm md:w-10/12 md:text-lg">
                    {toolGroup.description}
                  </p>
                </div>
                {/* Right Side */}
                <div className="grid w-full grid-cols-[repeat(auto-fit,64px)] justify-start gap-6 md:w-1/2 md:grid-cols-[repeat(auto-fit,80px)] md:justify-end md:gap-4">
                  {toolGroup.apps.map((app: any) => {
                    const image = app.icon;

                    return (
                      <div key={app._key} className="flex flex-col gap-2">
                        <div className="h-16 rounded-lg md:h-[80px]">
                          {image?.asset?._ref ? (
                            <Image
                              className="h-full rounded-lg object-fill"
                              src={urlForImage(image)?.url() as string}
                              alt={image?.alt || ""}
                              width={150}
                              height={150}
                              placeholder="blur"
                              blurDataURL={image.fullAsset.metadata.lqip}
                            />
                          ) : null}
                        </div>
                        <div className="">
                          <p className="text-xs font-medium leading-tight">
                            {app.name}
                          </p>
                          <p className="text-[.6rem] font-medium text-stone-400">
                            {app.category}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </article>
      </BlockContainer>
      <SectionContainer
        title="special thanks"
        paragraph="None of our work would be possible without the incredible talent, collaboration, and kindness of our team and partners. A heartfelt thank you to everyone who helped bring our ideas to life."
      />

      {/* Special Thanks */}
      <BlockContainer>
        <div className="grid-rows-[repeat(auto-fit,1fr] grid grid-cols-2 gap-6 gap-y-1 md:grid-cols-4 md:grid-rows-4">
          {names.map((person: any, index: any) => {
            return (
              <p key={index} className="text-base md:text-xl">
                {person}
              </p>
            );
          })}
        </div>
      </BlockContainer>

      <BlockContainer>
        <section className="w-full">
          <Carousel className="flex flex-col gap-3">
            <CarouselContent>
              {testimonials.map((testimonial: any) => {
                const image = testimonial.logo;
                const color = testimonial.color?.hex;

                return (
                  <CarouselItem key={testimonial._key}>
                    <div
                      className={cn(
                        "relative grid aspect-square place-content-start rounded-lg bg-[#000000] p-6 pt-10 text-white md:h-[640px] md:place-content-center md:px-28",
                      )}
                      style={{ backgroundColor: color }}
                    >
                      <p className="text-balance text-center text-base md:text-5xl">
                        {testimonial.text}
                      </p>
                      <figcaption className="absolute bottom-0 left-0 m-4 flex gap-2 md:m-8 md:gap-4">
                        <div className="relative aspect-square h-14 rounded-md bg-white p-2 md:h-24">
                          {image?.asset?._ref ? (
                            <Image
                              className="w-full rounded-md object-contain p-2"
                              src={urlForImage(image)?.url() as string}
                              fill
                              alt={image.alt || ""}
                              placeholder="blur"
                              blurDataURL={image.fullAsset.metadata.lqip || ""}
                            />
                          ) : null}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="-mb-1 text-sm md:text-base">
                            {testimonial.person}
                          </p>
                          <p className="text-sm opacity-60 md:text-base">
                            {testimonial.company}
                          </p>
                        </div>
                      </figcaption>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <nav className="flex justify-end gap-3">
              <CarouselPrevious className="relative left-0 right-0 transform-none" />
              <CarouselNext className="relative left-0 top-0 transform-none" />
            </nav>
          </Carousel>
        </section>
      </BlockContainer>

      {/* Closing block */}

      <BlockContainer>
        <div className="flex w-full flex-col justify-start gap-5">
          <h2 className="text-2xl tracking-tight md:text-5xl">
            Interested in working together? <br /> We'd love to hear from you.
          </h2>
          <Button
            asChild
            className="w-32 bg-stone-300 text-black hover:text-white"
          >
            <Link href="mailto:info@firmalt.com">Work with us</Link>
          </Button>
        </div>
      </BlockContainer>

      {/* Footer */}
      <BlockContainer>
        <div className="flex w-full flex-col gap-4 border-t border-black pt-8">
          <figure className="w-full pb-14">
            {image?.asset?._ref ? (
              <Image
                className="fill-black object-fill"
                src={urlForImage(blackLogo)?.url() as string}
                width={3000}
                height={1500}
                alt={blackLogo.alt || ""}
              />
            ) : null}
          </figure>
          <section className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-0">
            <div className="flex w-full flex-col gap-5 md:w-2/5">
              <p className="text-stone-800">{footer.text}</p>
              <Link
                href={`mailto:${footer.contact}`}
                className="underline underline-offset-4"
              >
                <p className="">Contact us</p>
              </Link>
            </div>
            {/* Right Side */}
            <div className="flex w-full gap-12 text-sm font-medium uppercase md:w-2/5 md:justify-end md:gap-5">
              <div className="flex flex-col gap-1">
                <p className="">MAIL</p>
                <p className="">WEB</p>
                <p className="">SOCIALS</p>
              </div>
              <div className="flex flex-col gap-1">
                <Link className="" href={footer.contactLinks.email}>
                  {footer.contactLinks.email}
                </Link>
                <Link className="" href={footer.contactLinks.website.url}>
                  {footer.contactLinks.website.title}
                </Link>
                <div className="flex flex-col gap-0">
                  {footer.contactLinks.socials.map((social: any) => {
                    return (
                      <Link key={social._key} className="" href={social.url}>
                        {social.company}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </BlockContainer>
    </main>
  );
}
