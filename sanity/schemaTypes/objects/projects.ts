import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  type: 'object',
  fields: [
    defineField({
      name: 'client',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
    }),
  ],
})
