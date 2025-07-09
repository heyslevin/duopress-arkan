import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { GalleryThumbnails, Image } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  fieldsets: [
    { name: "settings", title: "Settings" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      type: "string",
      fieldset: "settings",
      description: TITLE_DESCRIPTION,
      initialValue: "My Gallery",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      description:
        "Add multiple images for an image carousel, or add a single image for a full screen image",
      type: "array",
      fieldset: "content",
      of: [
        {
          name: "galleryImage",
          type: "image",
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: "alt",
            },
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description:
                "Short text to describe image. Important for SEO and accessiblity.",
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if (
                    (context.document?.galleryImage as any)?.asset?._ref &&
                    !alt
                  ) {
                    return "Required";
                  }
                  return true;
                });
              },
            },
          ],
        },
      ],
    }),
  ],
  icon: () => <GalleryThumbnails size={16} />,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Gallery",
        subtitle: title,
      };
    },
  },
});
