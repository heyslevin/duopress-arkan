import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
  TITLE_DESCRIPTION,
  TITLE_TEXT,
} from "@/sanity/lib/constants";
import { createUniqueIdentifier, formatString } from "@/sanity/lib/helpers";
import { LetterText, ListCollapse } from "lucide-react";
import { defineField, defineType } from "sanity";
import { kebabCase } from "lodash";

export default defineType({
  name: "accordion",
  type: "object",

  fields: [
    defineField({
      name: "sectionId",
      title: "🔗 Section Id for internal linking (Optional)",
      description: "Add an id if you want to link to this section.",
      type: "string",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      initialValue: "decoration",
      options: {
        list: [
          { title: "Decoration", value: "decoration" },
          { title: "No decoration", value: "no-decoration" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: HEADING_DESCRIPTION,
      type: "string",
    }),
    defineField({
      name: "caption",
      title: CAPTION_DESCRIPTION,
      type: "string",
    }),

    defineField({
      name: "text",
      title: "Text below heading (Optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "accordionItems",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 2,
            }),
          ],
          icon: LetterText,
          preview: {
            select: {
              title: "title",
            },
            prepare: ({ title }) => {
              return {
                title: title,
                subtitle: "Accordion Item",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (Rule) => Rule.max(2),
      of: [
        defineField({
          name: "image",
          type: "image",
        }),
      ],
    }),
  ],

  icon: () => <ListCollapse size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare: ({ heading }) => {
      return {
        title: "Accordion",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
