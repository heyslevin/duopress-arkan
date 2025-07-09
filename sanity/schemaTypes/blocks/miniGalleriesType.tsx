import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Layout, LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "miniGalleries",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      type: "string",
      description: CAPTION_DESCRIPTION,
    }),
    defineField({
      name: "heading",
      type: "string",
      description: HEADING_DESCRIPTION,
    }),

    defineField({
      name: "text",
      type: "text",
      description: "Brief description to be displayed alongside the galleries",
      rows: 2,
    }),
    defineField({
      name: "button",
      title: "Button Link",
      type: "navLink",
    }),
    defineField({
      name: "gallery1",
      title: "Top Left Illustrations",
      type: "photoGallery",
    }),
    defineField({
      name: "gallery2",
      title: "Top Right Gallery",
      type: "photoGallery",
    }),
    defineField({
      name: "gallery3",
      title: "Bottom Left Gallery",
      type: "photoGallery",
    }),
    defineField({
      name: "fixedImage",
      title: "Fixed Image",
      type: "image",
      description: "Logo image that doesn't change",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          description: "Alternative text for the image",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare: ({ heading }) => {
      return {
        title: "Mini Galleries",
        subtitle: heading ? formatString(heading, 25) : "Untitled",
      };
    },
  },
  icon: () => <LayoutGrid size={16} />,
});
