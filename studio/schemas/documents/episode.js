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
      ]
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
