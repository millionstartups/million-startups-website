
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import Date from './date'
import CoverImage from './cover-image'
import Avatar from './avatar'
import Link from 'next/link'

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
padding-right: 1.5rem;
padding-left: 1.5rem;

@media (max-width: 768px) {
    flex-direction: column;
  }
.margin {
  padding: 36px auto 32px;
}

.content {
  min-width: 50%;
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
  margin: 10px 0;
  max-width: 490px;
}

.title {
font-size: 2rem;
padding-right: 1rem;
}

.readMore {
  font-size: clamp(.5rem, 10vw + 1rem, 1rem);
  margin: 30px 0;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
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
        {excerpt && (
        <>
           <p>{excerpt}</p>
        <div className='readMore'>
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
        <a>Read more</a>
      </Link>
      </div>
      </>
        )}
       
        
      </div>
      <div className='margin'>
      <CoverImage slug={slug} imageObject={coverImage}  title={title} url={coverImage} />
    </div>
    </Section>
  )
}
