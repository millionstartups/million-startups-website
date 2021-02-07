import PostPreview from './post-preview'
import styled from 'styled-components'
import { Flex, Content } from '../layout/pageStyles'

const Grid = styled.div`
width: 75%;
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: 5rem;
margin-bottom: 4rem;
margin-left: auto;
margin-right: auto;
@media (min-width: 768px) { 
  width: 60%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 8rem;
  row-gap: 8rem;
  margin-right: 3rem;
 } //md

@media (min-width: 1024px) {
  width: 85%; 
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 4rem;
  margin-left: 2rem;
  }//lg
`

const StoryHeading = styled.h2`
margin: 2rem 0;
`

export default function MoreStories({ posts }) {
  return (
   
    <section><Content>
      <StoryHeading className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </StoryHeading><Flex>
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
      </Grid></Flex> </Content>
    </section>
    
  )
}
