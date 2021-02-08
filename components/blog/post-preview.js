import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import {imageBuilder} from '../../lib/sanity'
import styled from 'styled-components'

const Card = styled.div`
max-width: 24rem;
margin-left: 1rem;
margin-right: 1rem;
`

export default function PostPreview({
  title,
  coverImage,
  width,
  height,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <Card>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} imageObject={coverImage} width={width} height={height} url={imageBuilder(coverImage).url()} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <Avatar name={author?.name} picture={author?.picture} />
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </Card>
  )
}
