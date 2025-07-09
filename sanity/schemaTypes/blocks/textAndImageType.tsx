import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { MasterDetailIcon } from "@sanity/icons";
import { Book, BookImage } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "textAndImage",
  title: "Text and Image",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      description: TITLE_DESCRIPTION,
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "caption",
      type: "string",
      description: "Text above heading",
    }),

    defineField({
      name: "text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessiblity.",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "button",
      type: "object",
      fields: [
        { name: "buttonText", type: "string" },
        { name: "link", type: "link" },
      ],
    }),
  ],
  icon: () => <BookImage size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Text and Image",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
