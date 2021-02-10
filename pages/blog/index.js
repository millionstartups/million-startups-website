import {useEffect} from 'react'
import Link from 'next/link'
import {Flex} from '../../components/layout/pageStyles'
import styled from 'styled-components'
import Date from '../../components/blog/date'
import Container from '../../components/blog/container'
import MoreStories from '../../components/blog/more-stories'
import HeroPost from '../../components/blog/hero-post'
import { getSiteData } from '../../lib/api'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import MainContainer from '../../components/layout/MainContainer'

const H2 = styled.h2`
margin-top: 2rem;
margin-bottom: 2rem;
`

const H4 = styled.h4`
margin-top: 1rem;
margin-bottom: 1rem;
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: .2rem;

`
const InnerGrid = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(4, minmax(0, 1fr));
@media (max-width: 765px) {
     
grid-template-columns: repeat(3, minmax(0, 1fr));
  }
column-gap: 0;
.sm-hidden {
  @media (max-width: 765px) {
     display: none;
  }
}
`

const ListItem = styled.div`
background-color: rgba(55,55,55,.2);

display: flex;
justify-content: center;
align-items: center;
text-align: center;
padding: 1rem;
`

export default function Index({ site, allPosts }) {
  const {logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud} = site
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1,4)
  const TablePosts = allPosts
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('controlling', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener('activated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = event => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (confirm('We have new content. Do you want to reload to update?')) {
          wb.addEventListener('controlling', event => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSW({ type: 'SKIP_WAITING' })
        } else {
          console.log(
            'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
          )
        }
      }

      wb.addEventListener('waiting', promptNewVersionAvailable)
      wb.addEventListener('externalwaiting', promptNewVersionAvailable)

      // ISSUE - this is not working as expected, why?
      // I could only make message event listenser work when I manually add this listenser into sw.js file
      wb.addEventListener('message', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      /*
      wb.addEventListener('redundant', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalinstalled', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalactivated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      */

      // never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, []) 
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
        soundcloud={soundcloud}
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
       <Flex>        
        <H4>List of all blog post</H4>
        </Flex>
        <Grid>
        <InnerGrid>
          <ListItem>Title</ListItem>

          <ListItem>Published On</ListItem>
          <ListItem className='sm-hidden'>Excerpt</ListItem>
          <ListItem>Link</ListItem>
        </InnerGrid>

         {TablePosts.map((plist) => (
          <InnerGrid key={plist._id}>
          <ListItem>{plist.title}</ListItem>
          <ListItem><Date dateString={plist.date} /></ListItem>
          <ListItem className='sm-hidden'>{plist.excerpt.substring(0, 95)}{'...'}</ListItem>
          <ListItem><Link href={`/blog/${plist.slug}`}><a>View Post</a></Link></ListItem>
          </InnerGrid>
        ))}
        </Grid>

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
