import Avatar from './blog/avatar'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 768px) {
    flex-direction: column;
  }
.margin {
  margin: 36px auto 32px;
}

.content {
  min-width: 500px; 
  @media (max-width: 768px) {
    text-align: center;
  }
}

.author-block {
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

p{
  max-width: 490px;
}

.title {
font-size: 2rem;
}

.readMore {
  margin: 30px 0;
}

`
export default function HeroPost({
  title,
  coverImage,
  date,
  author,
  slug,
  excerpt
}) {
  return (
    <Section>
      <div className='margin'>
        <div className='content'>
          <h1 className='title'>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a>{title}</a>
            </Link>
          </h1>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div className='author-block'>
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
        <p>{excerpt}</p>
        <div className='readMore'>
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
        <a>Read more</a>
        
      </Link>
      </div>
      </div>
      <div className='margin'>
      <CoverImage slug={slug} imageObject={coverImage} title={title} url={coverImage} />
    </div>
    </Section>
  )
}
