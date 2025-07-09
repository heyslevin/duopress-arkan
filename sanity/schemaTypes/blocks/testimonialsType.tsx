import {
  CAPTION_DESCRIPTION,
  HEADING_DESCRIPTION,
  TEXT_DESCRIPTION,
  TITLE_DESCRIPTION,
  TITLE_TEXT,
} from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Award, Trophy, TrophyIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

/* 
Caption, Heading, Text,
Metric:
Array of object with number, unit, text

 */

export default defineType({
  name: "testimonials",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      description: TITLE_DESCRIPTION,
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: ["light", "dark"],
      },
      description: "The style of the testimonials",
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

    defineField({
      name: "text",
      type: "text",
      description: TEXT_DESCRIPTION,
      rows: 2,
    }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonialItem",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: {
                hotspot: true,
              },
              description: "The image of the person giving the testimonial",
            }),
            defineField({
              name: "name",
              type: "string",
              description: "The name of person giving the testimonial",
            }),
            defineField({
              name: "role",
              type: "string",
              description: "The role of the person giving the testimonial",
            }),
            defineField({
              name: "text",
              type: "text",
              description: "The testimonial text",
              rows: 2,
            }),
          ],
          icon: Award,
          preview: {
            select: {
              name: "name",
              media: "image",
            },
            prepare: ({ name, media }) => {
              return {
                title: name,
                subtitle: "Testimonial",
                media: media,
              };
            },
          },
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
        title: "Testimonials",
        subtitle: heading ? formatString(heading, 25) : "Untitled",
      };
    },
  },
  icon: () => <Trophy size={16} />,
});
