import styled from 'styled-components'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/blog/container'
import PostBody from '../../components/blog/post-body'
import MoreStories from '../../components/blog/more-stories'
import HeroPostSlug from '../../components/blog/hero-post-slug'
import Comments from '../../components/blog/comments'
import SectionSeparator from '../../components/blog/section-separator'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'
import Form from '../../components/blog/form'

const Article = styled.article`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export default function Post({ post, morePosts }) {
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
            
              <Head>
                <title>
                  {post.title} | The Million Startups
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <Article>
              
        
              <HeroPostSlug
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.body} />
           
            <Comments comments={post.comments} />
            <Form _id={post._id} />

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />} 
            </Article>

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
