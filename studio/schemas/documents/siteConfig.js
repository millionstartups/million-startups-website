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
      type: "mainImage",
    },
    {
      name: 'linkedin',
      type: 'url',
      title: 'Linkedin',
      description: 'URL to the website Linkedin profile'
    },
    {
      name: 'facebook',
      type: 'url',
      title: 'Facebook',
      description: 'URL to the website Facebook page'
    },
    {
      name: 'youtube',
      type: 'url',
      title: 'YouTube',
      description: 'URL to the website YouTube page'
    },
    {
      name: 'twitter',
      type: 'url',
      title: 'Twitter',
      description: 'URL to the website Twitter page'
    },
    {
      name: 'tiktok',
      type: 'url',
      title: 'TikTok',
      description: 'URL to the website TikTok page'
    },
    {
      name: 'spotify',
      type: 'url',
      title: 'Spotify',
      description: 'URL to the website Spotify page'
    },
    {
      name: 'applepodcast',
      type: 'url',
      title: 'Apple Podcast',
      description: 'URL to the website Apple Podcast page'
    },
    {
      name: 'googlepodcast',
      type: 'url',
      title: 'Google Podcast',
      description: 'URL to the website Google Podcast page'
    },
    {
      name: 'amazonmusic',
      type: 'url',
      title: 'Amazon Music',
      description: 'URL to the website Amazon Music page'
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
