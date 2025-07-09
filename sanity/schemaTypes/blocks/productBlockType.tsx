import React from "react";
import { ShoppingBag, Target } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "productBlock",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "🔗 Section Id for internal linking (Optional)",
      description: "Add an id if you want to link to this section.",
      type: "string",
    }),
    defineField({
      name: "style",
      title: "Style",
      description: "Can be compact or full information",
      type: "string",
      initialValue: "compact",
      options: {
        list: [
          { title: "Compact", value: "compact" },
          { title: "Full Information", value: "full" },
        ],
      },
    }),
    defineField({
      name: "heading",
      description: "Optional",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "caption",
      description: "Optional",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "text",
      description: "Optional",
      title: "Text",
      type: "text",
      rows: 2,
    }),
  ],
  icon: () => <Target size={16} />,
  preview: {
    select: {
      heading: "heading",
      caption: "caption",
    },
    prepare({ heading }) {
      return {
        title: "Product Block",
        subtitle: heading || null,
      };
    },
  },
});
