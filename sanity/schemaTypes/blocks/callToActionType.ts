import { defineField, defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  icon: BulbOutlineIcon,
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
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "button",
      title: "Button Link",
      type: "navLink",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "Call to Action",
      };
    },
  },
});
