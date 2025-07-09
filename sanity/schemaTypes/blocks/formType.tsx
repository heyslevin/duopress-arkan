import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";

import { TextCursor, TextCursorInput } from "lucide-react";
import React from "react";
import { defineField, defineType } from "sanity";
import _ from "lodash";

export default defineType({
  name: "form",
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
      name: "text",
      type: "text",
      description: "Optional text below heading",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Form input fields",
      type: "array",
      description: "Add input fields like Name, Email, Phone, etc",
      of: [
        defineField({
          name: "formItems",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: ["text", "email", "phone", "message"],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Field Title",
              description: "Title above input field",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              type: "string",
              description: "Optional: Custom placeholder inside input field.",
            }),
          ],
          icon: TextCursor,
          preview: {
            select: {
              title: "title",
              type: "type",
            },
            prepare({ title, type }) {
              return {
                title: title,
                subtitle: `${_.capitalize(type)} Input`,
              };
            },
          },
        }),
      ],
    }),
  ],
  icon: () => <TextCursorInput size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Form",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
