import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
  TEXT_DESCRIPTION,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { LayoutDashboard } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "tabsDoubleImage",
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
      name: "tabs",
      type: "array",
      of: [
        defineField({
          name: "tab",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              description: "Tab title",
            }),
            defineField({
              name: "text",
              type: "text",
              description: TEXT_DESCRIPTION,
              rows: 3,
            }),
            defineField({
              name: "image",
              type: "image",
              description: "Image shown for this tab",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare: ({ title }) => {
              return {
                title: title || "Untitled Tab",
                subtitle: "Tab",
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
    },
    prepare: ({ heading }) => {
      return {
        title: "Tabs Double Image",
        subtitle: heading ? formatString(heading, 25) : "Untitled",
      };
    },
  },
  icon: () => <LayoutDashboard size={16} />,
});
