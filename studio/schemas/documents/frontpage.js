export default {
    name: 'frontpage',
    type: 'document',
    title: 'Frontpage',
    __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
    fields: [
      {
        name: 'title',
        type: 'string',
        description: 'Title that displays in the browser window'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        //readOnly: 'true',
        description: 'Slug for the frontend. Contact your developer to change this setting.',
        options: {
          source: 'title',
          maxLength: 20
        }
      },
      {
        name: 'body',
        title: 'Content Body',
        type: 'blockContent'
      },
      {
        title: "Image",
        description: "SVGs are best for fast page loads.",
        name: "image",
        type: "image",
        options: { hotspot: true, lqip: true, },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative text",
            description: "Important for SEO and accessiblity.",
            options: {
              isHighlighted: true,
            },
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      }
    }
  }
  