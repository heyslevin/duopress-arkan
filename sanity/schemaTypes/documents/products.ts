import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Target } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "products",
  title: "Productos",
  type: "document",
  icon: Target,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "products" }),
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      initialValue: "sand",
      options: {
        list: [
          { title: "Sand", value: "sand" },
          { title: "Pale Green", value: "pale-green" },
          { title: "Green", value: "green" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Super Short Summary ~5-7, for product cards",
      type: "string",
    }),
    defineField({
      name: "summary",
      description: "Short ~10-15 word summary",
      title: "Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      description: "Full description of the product",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "idealText",
      title: "Ideal Para:",
      type: "string",
    }),
    defineField({
      name: "clientTypes",
      title: "Ideal clients industries",
      type: "array",
      of: [
        defineField({
          name: "clientType",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt",
                  type: "string",
                  initialValue: "Client Type Icon",
                  hidden: true,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        defineField({
          name: "benefit",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Benefit",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt",
                  type: "string",
                  initialValue: "Benefit Icon",
                  hidden: true,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "requisitos",
      title: "Requisitos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "intereses",
      title: "Intereses y Comisiones",
      type: "blockContent",
    }),
    defineField({
      name: "productInfoLink",
      title: "Full product information location (page)",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
