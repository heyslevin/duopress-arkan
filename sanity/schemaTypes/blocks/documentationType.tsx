import React from "react";
import { FileText } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "documentationType",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "🔗 Section Id for internal linking (Optional)",
      description: "Add an id if you want to link to this section.",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "documents",
      title: "Documents",
      type: "array",
      of: [
        {
          name: "documentSection",
          type: "object",
          fields: [
            defineField({
              name: "sectionId",
              title: "🔗 Section Title for document navigation",
              description: "Add a unique title for the document navigation",
              type: "string",
            }),

            defineField({
              name: "content",
              title: "Content",
              type: "blockContent",
            }),
          ],
        },
      ],
    }),
  ],
  icon: () => <FileText size={16} />,
  preview: {
    select: {
      sectionId: "sectionId",
      heading: "heading",
      documents: "documents",
    },
    prepare({ sectionId, heading, documents }) {
      return {
        title: "Documentation",
        subtitle: sectionId
          ? `Section ID: ${sectionId}`
          : heading || "No heading",
        media: () => <FileText size={16} />,
      };
    },
  },
});
