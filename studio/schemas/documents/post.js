import {BsFilePost} from 'react-icons/bs'
export default {
  name: 'post',
  title: 'Post',
  icon: BsFilePost,
  type: 'document',
  initialValue: () =>({
    publishedAt: new Date().toISOString(),
    sitedata: {
      "_ref": "siteConfig",
      "_type": "reference"
    },
  }),
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: Rule => Rule.required().min(10).max(250),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo-tools',
      description: 'Runs an audit on the blog post', // use seo-tools type
      options: {
          baseUrl: 'https://themillionstartups.com/blog/', // (REQUIRED) This is the baseUrl for your site
          baseUrl(doc) {
              return 'https://themillionstartups.com/blog/'; // for dynamic baseUrls
          },
          slug(doc) { // (REQUIRED) a function to return the sug of the current page, which will be appended to the baseUrl
              return doc.slug.current;
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
  },
  {
    name: 'sitedata',
    title: 'Persistant Data from Site Config',
    description: 'Required field for header and footer data',
    type: 'reference',
    to: {type: 'siteConfig'},
    validation: Rule => Rule.required()
  }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
