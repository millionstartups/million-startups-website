import {Fragment} from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {groq} from 'next-sanity'
import {getClient} from '../../lib/sanity'
import {Flex} from '../../components/layout/pageStyles'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/post-header'
import Comments from '../../components/comments'
import SectionSeparator from '../../components/section-separator'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'
import Form from '../../components/form'

const sitePostQuery = groq`*[_type == "siteConfig"][0]{
  logo
}`


export default function Post({ post, morePosts, preview, logo }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <MainContainer navpagetitle='Blog' preview={preview}>
    {console.log(logo)}
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
        
              <PostHeader
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

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  const sitepost = await getClient().fetch(sitePostQuery);
  return {
    props: {
      preview,
      sitepost: sitepost,
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
    fallback: true,
  }
}
