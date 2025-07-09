import { PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

// To do: Add Rest of fields

export default defineType({
  name: "header",
  title: "Navigation Menus",
  type: "document",
  icon: PanelTop,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Navigation Menus",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "navigation",
      title: "Header Navigation",
      type: "array",
      of: [
        defineField({
          name: "navLink",
          type: "navLink",
        }),
      ],
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "array",
      of: [
        defineField({
          name: "navLink",
          type: "navLink",
        }),
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
    }),
    defineField({
      name: "footerLogos",
      description: "Logos a enseñar por ley",
      title: "Footer Logos",
      type: "photoGallery",
    }),
  ],
});
