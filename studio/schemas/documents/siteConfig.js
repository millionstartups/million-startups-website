import { MdSettings } from "react-icons/md";


export default {
  name: "siteConfig",
  type: "document",
  title: "Site configuration",
  icon: MdSettings,
  __experimental_actions: ['update', /* 'create',   'delete', */ 'publish'],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title",
    },
    {
      title: "Small Brand Logo",
      description: "Best choice is to use an SVG where the color are set with currentColor",
      name: "logo",
      type: "image",
      options: { hotspot: true, lqip: true },
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
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog. Press Enter after each keyword.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    }
  ],
};
