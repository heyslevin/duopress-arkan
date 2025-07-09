import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import MyPrefixedSlug from "@/sanity/components/MyPrefixedSlug";
import * as demo from "../../lib/initialValues";

// To do: Add Rest of fields

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "websiteTitle",
      description: "This field is the title of your website.",
      title: "Title",
      type: "string",
      initialValue: "My website",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Tagline",
    }),
    defineField({
      name: "brandAssets",
      title: "Brand Assets",
      type: "object",
      fields: [
        defineField({
          name: "primaryLogo",
          title: "Primary Logo",
          type: "image",
        }),
        defineField({
          name: "secondaryLogo",
          title: "Secondary Logo",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      description:
        "Id Starts with GTM- (Example: GTM-XXXXXXX) Add the full ID here. If you don't have a Google Tag Manager ID, leave this blank.",
      type: "string",
      placeholder: "GTM-XXXXXXX",
    }),
    defineField({
      name: "description",
      description:
        "Used both for the <meta> description tag for SEO, and the blog subheader.",
      title: "Description",
      type: "array",
      initialValue: demo.description,
      of: [
        defineArrayMember({
          type: "block",
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: "object",
                name: "link",
                fields: [
                  {
                    type: "string",
                    name: "href",
                    title: "URL",
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Displayed on social cards and search engine results.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          description: "Important for accessibility and SEO.",
          title: "Alternative text",
          type: "string",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        }),
        defineField({
          name: "metadataBase",
          type: "url",
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      fields: [
        defineField({
          name: "address",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "phone",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "email",
          type: "string",
          validation: (Rule) => Rule.email(),
        }),
      ],
    }),
    defineField({
      name: "socials",
      description: "Add your social media handles",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          type: "string",
          components: {
            input: MyPrefixedSlug,
          },
          options: {
            urlPrefix: "instagram.com/",
            maxLength: 30,
          },
        }),
        defineField({
          name: "linkedIn",
          type: "string",
          components: {
            input: MyPrefixedSlug,
          },
          options: {
            urlPrefix: "linkedin.com/",
            maxLength: 30,
          },
        }),
        defineField({
          name: "x",
          type: "string",
          components: {
            input: MyPrefixedSlug,
          },
          options: {
            urlPrefix: "x.com/",
            maxLength: 30,
          },
        }),
        defineField({
          name: "newsletter",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "legal",
      type: "object",
      fields: [
        defineField({
          name: "privacyPolicy",
          type: "file",
          options: {
            accept: "application/pdf",
          },
        }),
        defineField({
          name: "termsOfService",
          type: "file",
          options: {
            accept: "application/pdf",
          },
        }),
      ],
    }),

    defineField({
      name: "contactEmail",
      description: "This is the email that receives contact form submissions",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
