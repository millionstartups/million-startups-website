import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { imageBuilder } from '../../lib/sanity'

export default function CoverImage({ title, url, imageObject, slug }) {
  const image = (
   
    <Image
      width={410}
      height={290}
      layout='intrinsic'
      alt={`Cover Image for ${title}`}
      src={imageBuilder(imageObject).auto('format').fit('fillmax').width(410).height(300).url()}
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
