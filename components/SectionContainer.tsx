import { cn } from "@/lib/utils";
import BlockContainer from "./BlockContainer";
import { animateIn } from "@/sanity/lib/utils";

interface SectionContainerProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  paragraph?: string;
  id?: string;
}

export default function SectionContainer({
  children,
  className,
  title,
  paragraph,
  id,
}: SectionContainerProps) {
  return (
    <BlockContainer
      id={id}
      lang="en"
      className={cn(
        "flex-col gap-10 px-8 py-10 text-center md:py-12",
        className,
      )}
    >
      <h2
        lang="en"
        className={cn(
          "w-full hyphens-auto break-words text-5xl font-black uppercase leading-[4rem] tracking-tight motion-delay-2000 md:text-8xl md:leading-[6rem]",
        )}
      >
        {title}
      </h2>
      <div className="w-full md:w-2/3">
        <p className={cn("text-balance text-base md:text-lg")}>{paragraph}</p>
      </div>
    </BlockContainer>
  );
}
