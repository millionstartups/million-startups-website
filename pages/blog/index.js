import Container from '../../components/blog/container'
import MoreStories from '../../components/blog/more-stories'
import HeroPost from '../../components/blog/hero-post'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSiteData } from '../../lib/api'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'



export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)//1,4
  const TablePosts = allPosts
  return (
    <>
      <MainContainer 
        navpagetitle='Blog' 
      >
        <Head>
          <title>Blog - The Million Startups</title>
        </Head>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
            
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </MainContainer>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('site', getSiteData, {cacheTime: 5000, staleTime: 10000})
  const allPosts = await getAllPostsForHome(preview)
  
  return {
    props: { allPosts, preview, dehydratedState: dehydrate(queryClient) },
    revalidate: 1
  }
}
