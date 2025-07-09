import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "paragraph",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      description: TITLE_DESCRIPTION,
      initialValue: "My Paragraph",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "textBlock",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  icon: () => <LetterText size={16} />,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Paragraph",
        subtitle: title,
      };
    },
  },
});
