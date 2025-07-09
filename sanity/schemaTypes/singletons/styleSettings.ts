import {Palette} from 'lucide-react'
import {defineField, defineType} from 'sanity'

// To do: Add Rest of fields

export default defineType({
  name: 'style',
  title: 'Site Styles',
  type: 'document',
  icon: Palette,
  fields: [
    defineField({
      name: 'primaryColor',
      type: 'string',
    }),
  ],
})
