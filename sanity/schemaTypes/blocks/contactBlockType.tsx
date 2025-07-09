import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
  TEXT_DESCRIPTION,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Contact2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactBlock",
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
      name: "text",
      type: "text",
      description: TEXT_DESCRIPTION,
      rows: 3,
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Image for the contact block",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          description: "Alt text for the image",
          initialValue: "Contact Block Image",
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "email",
          type: "object",
          fields: [
            defineField({
              name: "email",
              type: "string",
              description: "Contact email address",
            }),
            defineField({
              name: "label",
              type: "string",
              description: "Label for the email address",
            }),
          ],
        }),
        defineField({
          name: "email2",
          type: "object",
          fields: [
            defineField({
              name: "email",
              type: "string",
              description: "Contact email address",
            }),
            defineField({
              name: "label",
              type: "string",
              description: "Label for the email address",
            }),
          ],
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
        title: "Contact Block",
        subtitle: heading ? formatString(heading, 25) : "Untitled",
      };
    },
  },
  icon: () => <Contact2 size={16} />,
});
