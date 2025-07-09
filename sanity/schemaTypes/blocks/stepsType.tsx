import React from "react";
import { ListOrdered } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "stepsType",
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
      title: "Theme Style",
      type: "string",
      initialValue: "decoration",
      options: {
        list: [
          { title: "Light Background", value: "light" },
          { title: "Green Background", value: "green" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Step Heading",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              rows: 2,
            }),
          ],
        },
      ],
    }),
  ],
  icon: () => <ListOrdered size={16} />,
  preview: {
    select: {
      sectionId: "sectionId",
      heading: "heading",
      steps: "steps",
    },
    prepare({ sectionId, heading, steps }) {
      return {
        title: "Steps",
        subtitle: sectionId
          ? `Section ID: ${sectionId}`
          : heading || "No heading",
        media: () => <ListOrdered size={16} />,
      };
    },
  },
});
