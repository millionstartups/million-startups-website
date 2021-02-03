export default {
    name: 'contact',
    type: 'document',
    title: 'Contact',
    __experimental_actions: ['update', /* 'create',  'delete', */ 'publish'],
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
      {
        name: 'seo',
        title: 'SEO',
        type: 'seo-tools',
        description: 'Runs an audit on the Contact Page', // use seo-tools type
        options: {
            baseUrl: 'https://themillionstartups.com/', // (REQUIRED) This is the baseUrl for your site
            baseUrl(doc) {
                return 'https://themillionstartups.com/'; // for dynamic baseUrls
            },
            slug(doc) { // (REQUIRED) a function to return the sug of the current page, which will be appended to the baseUrl
                return `${doc.slug.current}`;
            },
            fetchRemote: true, // Can be set to false to disable fetching the remote source (you will need to pass the content helpers for analysis)
            content(doc) {
                return 'simple html representation of your doc'; // (OPTIONAL) If your site is generated after Sanity content updates you can use this for better real time feedback
            },
            title(doc) {
                return 'page title'; // (OPTIONAL) return page title otherwise inferred from scrape
            },
            description(doc) {
                return 'page description'; // (OPTIONAL) return page description otherwise inferred from scrape
            },
            locale(doc) {
                return 'page locale'; // (OPTIONAL) return page locale otherwise inferred from scrape
            },
            contentSelector: 'body' // (OPTIONAL) option to finetune where Yoast will look for the content. (only applicable for scraping without content function)
        },
    }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      }
    }
  }
  