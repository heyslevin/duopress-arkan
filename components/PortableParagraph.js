import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export const PortableParagraph = {
  block: {
    h1: ({ children }) => (
      <h1 className="my-4 text-lg leading-[2.4rem] tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-4 text-base leading-none tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-4 text-2xl leading-none tracking-tight md:text-4xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="my-4 text-xl tracking-tight md:text-3xl">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="my-4 text-lg md:text-2xl">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="my-4 text-sm md:text-xl">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-base text-gray-600">{children}</p>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="my-4 ml-4 list-disc">{children}</ul>
    ),
    number: ({ children }) => <ol className="my-4 ml-8">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-gray-600">{children}</li>
    ),
    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("?")
        ? "norefferer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="border-b border-white hover:border-red-500"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative top-2 -mt-4 ml-1 mr-1 inline-block h-10 w-10 md:h-14 md:w-14">
          <Image
            src={urlForImage(value)?.url() || ""}
            alt={value.alt || ""}
            className="object-contain"
            fill
          />
        </div>
      );
    },
  },
};
