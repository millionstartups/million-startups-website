import client, { previewClient } from './sanity'
 
//blog schemas
const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
 'site': sitedata->{
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
 },
  _id,
  name,
  title,
  'date': publishedAt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
      
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
      excerpt
    }`)
  return getUniquePosts(results)
}

export async function getSiteData() {
  const sitedata = await getClient()
    .fetch(`*[_type == "siteConfig"][0]{
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
      amazonmusic,
      soundcloud
    }`
  )
  return sitedata
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^._id && 
                      approved == true] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        },
        'site': *[
          _type == "siteConfig"][0] {
            logo, 
            facebook,
            twitter,
            linkedin,
            youtube,
            googlepodcast,
            applepodcast,
            spotify, 
            tiktok, 
            amazonmusic,
            soundcloud                 
          },
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
        excerpt,
        'site': *[
          _type == "siteConfig"][0] {
            logo, 
            facebook,
            twitter,
            linkedin,
            youtube,
            googlepodcast,
            applepodcast,
            spotify, 
            tiktok, 
            amazonmusic,
            soundcloud                 
          },
      }[0..2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}

//Episodes schema

const getUniqueEpisodes = (episodes) => {
  const slugs = new Set()
  return episodes.filter((episode) => {
    if (slugs.has(episode.slug)) {
      return false
    } else {
      slugs.add(episode.slug)
      return true
    }
  })
}

const episodeFields = `
_id,
_createdAt,
'date': publishedAt,
title,
episodeNumber,
`

export async function getAllEpisodesWithSlug() {
  const data = await client.fetch(`*[_type == "episode"]{ 'slug': slug.current }`)
  return data
}

export async function getAllEpisodes(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "episode"] | order(publishedAt desc){
      ${episodeFields}
      description,
      image,
      'video': videoClip.url,
      'slug': slug.current,
    }`)
  return results
}

export async function getEpisodeAndMoreEpisodes(slug, preview) {
  const nexClient = getClient(preview)
  const [episode, moreEpisodes] = await Promise.all([
    nexClient.fetch(
        `*[_type == "episode" && slug.current == $slug] | order(_updatedAt desc) {
        ${episodeFields}
        description,
        image,
        'video': videoClip.url,
        }
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    nexClient.fetch(
      `*[_type == "episode" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${episodeFields}
      }[0]`,
      { slug }
    ),
  ])
  return { episode, moreEpisodes: getUniqueEpisodes(moreEpisodes) }
}
