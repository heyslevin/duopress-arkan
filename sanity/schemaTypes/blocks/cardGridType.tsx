import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
  TEXT_DESCRIPTION,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardGrid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      description: HEADING_DESCRIPTION,
    }),
    defineField({
      name: "caption",
      type: "string",
      description: CAPTION_DESCRIPTION,
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brief description to introduce the card grid",
      rows: 2,
    }),
    defineField({
      name: "style",
      type: "string",
      description: "Visual style of the card grid",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: "light",
    }),
    defineField({
      name: "columns",
      type: "number",
      description: "Number of columns in the grid (2-4)",
      validation: (Rule) => Rule.min(2).max(4),
      initialValue: 3,
    }),
    defineField({
      name: "cards",
      type: "array",
      of: [
        defineField({
          name: "card",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              description: "Card title",
            }),
            defineField({
              name: "text",
              type: "text",
              description: TEXT_DESCRIPTION,
              rows: 3,
            }),
            defineField({
              name: "icon",
              type: "string",
              description: "Icon name (optional)",
            }),
            defineField({
              name: "image",
              type: "image",
              description: "Optional card image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "linkText",
              type: "string",
              description: "Text for the call-to-action link",
            }),
            defineField({
              name: "linkUrl",
              type: "string",
              description: "URL for the call-to-action link",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
              media: "image",
            },
            prepare: ({ title, subtitle, media }) => {
              return {
                title: title || "Untitled Card",
                subtitle: subtitle ? formatString(subtitle, 50) : "No content",
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      cards: "cards",
    },
    prepare: ({ heading, cards = [] }) => {
      return {
        title: "Card Grid",
        subtitle: `${heading ? formatString(heading, 25) : "Untitled"} - ${cards.length} cards`,
      };
    },
  },
  icon: () => <LayoutGrid size={16} />,
});
