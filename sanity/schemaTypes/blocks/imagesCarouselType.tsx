import React from "react";
import { formatString } from "../../lib/helpers";
import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imagesCarousel",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "🔗 Section Id for internal linking (Optional)",
      description: "Add an id if you want to link to this section.",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "photoGallery",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
      },
      initialValue: "dark",
    }),
  ],
  icon: () => <Image size={16} />,
  preview: {
    select: {
      sectionId: "sectionId",
      images: "images",
    },
    prepare({ sectionId, images }) {
      return {
        title: "Images Carousel",
        subtitle: sectionId ? `${sectionId}` : null,
        media: images?.[0]?.image,
      };
    },
  },
});
