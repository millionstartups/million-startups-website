import Avatar from './blog/avatar'
import styled from 'styled-components'
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

`
export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <Section>
      <div className='margin'>
        <div className='content'>
          <h3>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a>{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div className='author-block'>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
      </div>
      <div className='margin'>
      <CoverImage slug={slug} imageObject={coverImage} title={title} url={coverImage} />
    </div>
    </Section>
  )
}
