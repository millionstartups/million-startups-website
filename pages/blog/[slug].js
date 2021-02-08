import {Fragment} from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {Flex} from '../../components/layout/pageStyles'
import Container from '../../components/blog/container'
import PostBody from '../../components/blog/post-body'
import MoreStories from '../../components/blog/more-stories'
import HeroPostSlug from '../../components/blog/hero-post-slug'
import Comments from '../../components/blog/comments'
import SectionSeparator from '../../components/blog/section-separator'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/blog/post-title'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'
import Form from '../../components/blog/form'



export default function Post({ post, morePosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const nav = post.site
     return (
    <MainContainer 
     navpagetitle='Blog'
     logo={nav.logo}
     facebook={nav.facebook} 
     twitter={nav.twitter}
     linkedin={nav.linkedin}
     youtube={nav.youtube} 
     googlepodcast={nav.googlepodcast} 
     applepodcast={nav.applepodcast} 
     spotify={nav.spotify}  
     tiktok={nav.tiktok}  
     amazonmusic={nav.amazonmusic}
     soundcloud={nav.soundcloud}
    >
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <Fragment>
            <article>
              <Head>
                <title>
                  {post.title} | The Million Startups
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              
              <Flex>
        
              <HeroPostSlug
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              /></Flex>
              <PostBody content={post.body} />
            </article>

            <Comments comments={post.comments} />
            <Form _id={post._id} />

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
         
          </Fragment>
        )}
      </Container>
    </MainContainer>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  return {
    props: {
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: false,
  }
}
