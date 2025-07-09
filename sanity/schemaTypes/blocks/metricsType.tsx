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
  name: "metrics",
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
      name: "metrics",
      type: "array",
      of: [
        defineField({
          name: "metricItem",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              type: "string",
              description: "The big metric to show",
            }),
            defineField({
              name: "caption",
              type: "string",
              description: "Short caption below metric",
            }),
            defineField({
              name: "text",
              type: "text",
              description: "Longer text explaining the metric",
              rows: 2,
            }),
          ],
          icon: Award,
          preview: {
            select: {
              heading: "heading",
              text: "text",
            },
            prepare: ({ heading, text }) => {
              return {
                title: heading,
                subtitle: text ? formatString(text, 25) : null,
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
        title: "Metrics",
        subtitle: heading ? formatString(heading, 25) : null,
      };
    },
  },
  icon: () => <Trophy size={16} />,
});
