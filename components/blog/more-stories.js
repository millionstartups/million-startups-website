import PostPreview from './post-preview'
import styled from 'styled-components'
import { Flex } from '../layout/pageStyles'

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
padding-left: 1.5rem; 
flex-direction: column;
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: 5rem;
margin-bottom: 4rem;
padding-left: auto;
padding-right: auto;
  @media (min-width: 768px) { 
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 8rem;
  row-gap: 8rem;
 } //md

@media (min-width: 1024px) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 4rem;
  }//lg
`

const Content = styled.div`
max-width: 1600px;
`

const StoryHeading = styled.h2`
padding: 2rem 0;
align-self: flex-start
`

export default function MoreStories({ posts }) {
  return (
   
    <Section>
    <Content>
      <StoryHeading className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </StoryHeading>
      <Grid>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </Grid>
      </Content>
    </Section>
    
  )
}
