export default {
    name: 'cookies',
    type: 'document',
    title: 'Cookie Policy Page',
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
        readOnly: 'true',
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
        type: "mainImage",
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      }
    }
  }
  