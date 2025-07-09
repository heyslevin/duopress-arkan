import { defineArrayMember, defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export default defineType({
  name: "infoSection",
  title: "Info Section",
  type: "object",
  icon: TextIcon,
  fields: [
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
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: "Info Section",
        subtitle: title,
      };
    },
  },
});
