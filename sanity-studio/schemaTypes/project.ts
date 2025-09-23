// sanity-studio/schemaTypes/project.ts

import {defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Film', value: 'film'},
          {title: 'Code', value: 'code'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'}, // For rich text (paragraphs, headings, etc.)
        {type: 'image'}, // For additional images within the project page
      ],
    },
  ],
})
