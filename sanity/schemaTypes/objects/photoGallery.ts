import { defineField, defineType } from "sanity";

export default {
  name: "photoGallery",
  type: "object",
  title: "Gallery",
  fields: [
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption / Link Url",
              description: "Optional",
            },
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              initialValue: "Gallery image",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Gallery block of ${Object.keys(images).length} images`,
        subtitle: `Alt text: ${image.alt}`,
        media: image,
      };
    },
  },
};
