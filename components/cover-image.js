import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { imageBuilder } from '../lib/sanity'

export default function CoverImage({ title, url, imageObject, slug }) {
  const image = (
    <Image
      width={190}
      height={120}
      layout='intrinsic'
      alt={`Cover Image for ${title}`}
      src={imageBuilder(imageObject).width(1240).height(540).url()}
    />
  )

  return (
    <Fragment>
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </Fragment>
   
  )
}
