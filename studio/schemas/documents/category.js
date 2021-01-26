import {AiOutlineTags} from 'react-icons/ai'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: AiOutlineTags,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
