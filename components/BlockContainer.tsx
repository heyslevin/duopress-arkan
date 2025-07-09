import { cn } from "@/lib/utils";

interface BlockContainerProps {
  children?: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  size?: keyof typeof STYLES;
  lang?: string;
  id?: string;
}

interface StyleType {
  height: string;
}

const STYLES: Record<string, StyleType> = {
  lg: { height: "md:h-[745px]" },
};

export default function BlockContainer({
  children,
  className,
  backgroundClassName,
  size,
  id,
  ...delegated
}: BlockContainerProps) {
  const styles: StyleType = size ? STYLES[size] : { height: "" };

  return (
    // Full-width wrapper for background
    <div
      className={cn(
        "w-full",
        styles?.height || "",
        backgroundClassName || "bg-muted",
      )}
    >
      <section
        id={id}
        className={cn(
          "mx-auto flex w-full max-w-[1900px] flex-col items-center justify-center px-4 py-16 font-normal md:px-10 md:py-12",
          className || "",
        )}
        {...delegated}
      >
        {/* Block Container  */}
        {children}
      </section>
    </div>
  );
}
