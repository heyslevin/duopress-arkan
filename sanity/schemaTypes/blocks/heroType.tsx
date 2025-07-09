import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "object",
  fieldsets: [
    { name: "settings", title: "Settings" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "style",
      title: "Style Settings",
      description: "Left Align or Centered",
      type: "string",
      fieldset: "settings",
      initialValue: "left",
      options: {
        list: [
          { title: "Left Align", value: "left" },
          { title: "Centered", value: "center" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "caption",
      type: "string",
      fieldset: "content",
      description: "Small Text above Heading",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      fieldset: "content",
      description: "Optional: Text below Heading",
      rows: 3,
    }),
    defineField({
      name: "button",
      title: "Primary Button",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "buttonSecondary",
      title: "Secondary Button",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "claims",
      title: "Claims",
      type: "array",
      hidden: ({ parent }) => parent?.style === "center",
      of: [
        defineField({
          name: "claim",
          title: "Claim",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt",
                  type: "string",
                  initialValue: "Claim Image",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
    }),
  ],
  icon: () => <Star size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Hero",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
