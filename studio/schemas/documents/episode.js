import {ImHeadphones} from 'react-icons/im'

export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  icon: ImHeadphones,
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
        maxLength: 45
      }
    },
    {
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        lqip: true
      }
    },
    {
      name: 'videoClip',
      title: 'Episode Video Clip',
      type: 'videoEmbed'
    },
    {
      name: 'materials',
      title: 'Presentation Materials',
      type: 'file'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: []
        }
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo-tools',
      description: 'Runs an audit on the Episode Page', // use seo-tools type
      options: {
          baseUrl: 'https://themillionstartups.com/episode/', // (REQUIRED) This is the baseUrl for your site
          baseUrl(doc) {
              return 'https://themillionstartups.com/episode/'; // for dynamic baseUrls
          },
          slug(doc) { // (REQUIRED) a function to return the sug of the current page, which will be appended to the baseUrl
              return doc.slug.current;},
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
      subtitle: 'episodeNumber',
      media: 'image'
    }
  }
}
