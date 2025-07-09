import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Users } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "clientCarousel",
  type: "object",
  fields: [
    defineField({
      name: "style",
      type: "string",
      description: "Light or dark background",
      initialValue: "light",
      options: {
        list: ["light", "dark"],
      },
    }),
    defineField({
      name: "heading",
      type: "string",
      description: HEADING_DESCRIPTION,
    }),
    defineField({
      name: "caption",
      type: "string",
      description: CAPTION_DESCRIPTION,
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare: ({ heading }) => {
      return {
        title: "Client Carousel",
        subtitle: heading
          ? formatString(heading, 25)
          : "Logos from Client Logos",
      };
    },
  },
  icon: () => <Users size={16} />,
});
