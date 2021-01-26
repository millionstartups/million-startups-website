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
        source: 'name',
        maxLength: 96
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
