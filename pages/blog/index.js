import { Fragment } from 'react'
import Container from '../../components/blog/container'
import MoreStories from '../../components/blog/more-stories'
import HeroPost from '../../components/blog/hero-post'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSiteData } from '../../lib/api'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'



export default function Index({ site, allPosts, preview }) {
  const {logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic,} = site
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1,4)
  const TablePosts = allPosts
  return (
    <>
      <MainContainer 
        navpagetitle='Blog' 
        logo={logo}
        facebook={facebook} 
        twitter={twitter}
        linkedin={linkedin}
        youtube={youtube} 
        googlepodcast={googlepodcast} 
        applepodcast={applepodcast} 
        spotify={spotify}  
        tiktok={tiktok}  
        amazonmusic={amazonmusic}
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
  const site = await getSiteData()
  const allPosts = await getAllPostsForHome(preview)
  
  return {
    props: { allPosts, preview, site },
    revalidate: 1
  }
}
