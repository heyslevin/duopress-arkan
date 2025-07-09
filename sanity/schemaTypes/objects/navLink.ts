import { defineField, defineType } from "sanity";

export default defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Navigation Text",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
  ],
});
