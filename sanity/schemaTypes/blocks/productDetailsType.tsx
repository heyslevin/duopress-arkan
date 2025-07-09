import { defineField, defineType } from "sanity";
import { PackageIcon } from "lucide-react";

export default defineType({
  name: "productDetailsType",
  title: "Product Details",
  type: "object",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "🔗 Section Id for internal linking (Optional)",
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "products" }],
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      media: "product.image",
    },
    prepare({ title, media }) {
      return {
        title: `Producto: ${title}`,
        media,
      };
    },
  },
});
