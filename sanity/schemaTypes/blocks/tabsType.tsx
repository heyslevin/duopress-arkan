import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { defineField, defineType } from "sanity";
import { LayoutList, PanelTop } from "lucide-react";
import { formatString } from "@/sanity/lib/helpers";

const dataShape = {
  title: "",
  caption: "",
  heading: "",
  tabs: [
    {
      heading: "",
      description: "",
      image: {
        asset: "",
        altText: "",
      },
    },
  ],
};

export default defineType({
  name: "tabs",
  title: "Tabs",
  type: "object",
  fieldsets: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      type: "string",
      description: TITLE_DESCRIPTION,
      fieldset: "settings",
      hidden: true,
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Small Text above Heading",
      fieldset: "content",
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
              name: "heading",
              type: "string",
            }),
            defineField({
              name: "description",
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
                  title: "Alternative text",
                  description: "Important for SEO and accessiblity.",
                  validation: (Rule) => Rule.required(),
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "heading",
            },
            prepare({ title }) {
              return {
                title: title,
                subtitle: "Tab",
              };
            },
          },
        }),
      ],
    }),
  ],
  icon: () => <LayoutList size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Tabs",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
