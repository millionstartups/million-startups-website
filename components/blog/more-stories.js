import PostPreview from './post-preview'
import styled from 'styled-components'

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
flex-direction: column;
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: 5rem;
margin-bottom: 4rem;
  @media (min-width: 768px) { 
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 2rem;
  row-gap: 2rem;
 } //md

@media (min-width: 1024px) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 4rem;
  }//lg
`

const Content = styled.div`
max-width: 1100px
`

const StoryHeading = styled.h2`
padding: 2rem 0;
@media (min-width: 768px) { 
  align-self: flex-start;
 } 
align-self: center;

`

export default function MoreStories({ posts }) {
  return (
   
    <Section> 
   
    <Content>
      <StoryHeading>
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
