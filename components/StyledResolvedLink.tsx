import { cn } from "@/lib/utils";
import ResolvedLink from "./ResolvedLink";
import { NavLink } from "@/sanity.types";

export default function StyledResolvedLink({
  button,
  className,
  style = "primary",
}: {
  button: NavLink;
  className?: string;
  style?: "primary" | "outline" | "ghost" | "maxWidth";
}) {
  return (
    <ResolvedLink
      className={cn(
        style === "primary" &&
          "flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-base text-white transition-colors duration-200 hover:bg-secondary/80 focus:bg-cyan-500 md:px-6 md:py-3 md:text-base",
        style === "maxWidth" &&
          "flex w-full justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-base text-white transition-colors duration-200 hover:bg-secondary/80 focus:bg-cyan-500 md:px-6 md:py-3 md:text-base",
        style === "outline" &&
          "flex items-center gap-2 rounded-md border border-white px-4 py-2 text-base text-white transition-colors duration-200 hover:bg-white/10 focus:bg-cyan-500 md:px-6 md:py-3 md:text-base",
        style === "ghost" &&
          "hover:bg-primary-light underline-primary/50 bg-transparent text-primary underline decoration-accent underline-offset-4 transition-all duration-200 hover:text-primary-foreground hover:decoration-primary",

        className,
      )}
      link={button?.link}
    >
      {button?.text}
    </ResolvedLink>
  );
}
