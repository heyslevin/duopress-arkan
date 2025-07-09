import { cn } from "@/lib/utils";
import BlockContainer from "../BlockContainer";

export function Steps({ block }: { block }) {
  return (
    <BlockContainer
      id={block.sectionId}
      backgroundClassName={cn(block.theme === "green" && "bg-primary")}
      className={cn(
        "px-4 py-6 md:px-8 md:py-10",
        block.theme === "green" && "text-white",
      )}
    >
      <div className="flex flex-col gap-4 py-4">
        <div className="text-sm md:text-base">{block.caption}</div>
        <h3
          className={cn(
            "",
            block.theme === "green" &&
              "text-center text-lg text-white md:text-2xl",
            block.theme === "light" && "text-3xl text-primary md:text-6xl",
          )}
        >
          {block.heading}
        </h3>
        <div className="mt-6 grid max-w-4xl gap-4 max-sm:grid-cols-1 md:mt-8 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:gap-6">
          {block.steps?.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-3 border-l border-accent-foreground pl-3 md:gap-12",
                block.theme === "green" && "border-green-500",
                block.theme === "light" && "border-accent-foreground",
              )}
            >
              <div
                className={cn(
                  "text-3xl md:text-5xl",
                  block.theme === "green" && "text-white",
                  block.theme === "light" && "text-secondary",
                )}
              >
                {index + 1}
              </div>
              <div>
                <h3 className="text-base md:text-lg">{step.heading}</h3>
                <p
                  className={cn(
                    "mt-1 text-sm text-muted-foreground md:mt-2 md:text-base",
                    block.theme === "green" && "text-gray-300",
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BlockContainer>
  );
}
