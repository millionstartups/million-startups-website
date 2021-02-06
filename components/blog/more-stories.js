import PostPreview from './post-preview'
import styled from 'styled-components'
import { Flex } from '../layout/pageStyles'

const Grid = styled.div`
width: 95%;
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: 5rem;
margin-bottom: 4rem;
@media (min-width: 768px) { 
  width: 55%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 8rem;
  row-gap: 8rem;
 } //md

@media (min-width: 1024px) {
  width: 75%; 
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 4rem;
  }//lg
`

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <Flex>
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
      </Flex>
    </section>
  )
}
