import {Fragment} from 'react'
import {Flex} from './layout/pageStyles'
import Avatar from './blog/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import {imageBuilder} from '../lib/sanity'
export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <div>
      <div>
        <PostTitle>{title}</PostTitle>
        <Avatar name={author?.name} picture={author?.picture} />
          <Date dateString={date} />
        </div>
      <div>
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div>
      </div>
 
  )
}
