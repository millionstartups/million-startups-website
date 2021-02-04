import Container from '../../components/blog/container'
import MoreStories from '../../components/blog/more-stories'
import {Flex} from '../../components/layout/pageStyles'
import HeroPost from '../../components/blog/hero-post'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../../lib/sanity'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'

const siteBlogQuery = groq`*[_type == "siteConfig"][0]{
  'siteTitle':title,
  logo,
  facebook, 
  twitter, 
  linkedin, 
  youtube, 
  googlepodcast, 
  applepodcast, 
  spotify, 
  tiktok, 
  amazonmusic
}`


export default function Index({ siteblog, allPosts, preview }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)//1,4
  const TablePosts = allPosts
  const { logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic } = siteblog
  return (
    <>
      <MainContainer 
        logo={logo} 
        navpagetitle='Blog' 
        preview={preview}
        facebook={facebook}
        twitter={twitter}
        youtube={youtube}
        linkedin={linkedin}
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
  const allPosts = await getAllPostsForHome(preview)
  const siteblog = await getClient().fetch(siteBlogQuery);
  return {
    props: { allPosts, siteblog, preview },
    revalidate: 1
  }
}
