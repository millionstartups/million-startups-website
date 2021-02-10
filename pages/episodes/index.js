import {Fragment, useEffect} from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Flex, Card} from '../../components/layout/pageStyles'
import MainContainer from '../../components/layout/MainContainer'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getSiteData } from '../../lib/api'
import { imageBuilder } from '../../lib/sanity'
import { getAllEpisodes } from '../../lib/api'
import Date from '../../components/blog/date'
import {SiGooglepodcasts, SiSpotify, SiApplepodcasts} from 'react-icons/si'

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
row-gap: .2rem;

`
const InnerGrid = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(4, minmax(0, 1fr));
column-gap: 0;
`

const ListItem = styled.div`
background-color: rgba(55,55,55,.2);

display: flex;
justify-content: center;
align-items: center;
text-align: center;
padding: 1rem;
`

const Content = styled.article`
max-width: 1100px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
pre {max-width: 400px}
`

const H2 = styled.h2`
margin-top: 2rem;
margin-bottom: 2rem;
`

const H4 = styled.h4`
margin-top: 1rem;
margin-bottom: 1rem;
`

const Heading = styled(motion.h1)`
font-size: 2rem;
`

const PodcastIcons = styled(motion.div)`
font-size: 2rem;
margin: 2rem 0;
`


const animatedcard = {
  initial: {
      opacity: 0,
      y: 99,
      transition: {
      duration: .7,
    } 
  },
  animate: { 
      opacity: 1,
      y: 0,
      transition: {
      duration: .7,
    }
  }
}



const animatedicons = {
  initial: {
      opacity: 0,
      x: 20,
      transition: {
      duration: 1.2,
    } 
  },
  animate: { 
      opacity: 1,
      x: 0,
      transition: {
      duration: 1.2,
    }
  }
}


const EpisodesPage = ({ allEpisodes, site}) => {
  const homeEpisode = allEpisodes[0]
  const episode = homeEpisode
  const {logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud} = site
  const {title, episodeNumber, image, description} = episode
  
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
        <Fragment>
        <Head>
        <title>Episodes - Million Startups</title>
        </Head>
        <MainContainer 
          navpagetitle='Episodes' 
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
        <Content>
        <Flex>
        <AnimatePresence>
         <Card variants={animatedcard}
          >
          <Flex smFlexDir='column-reverse'>
          <motion.div 
           className='left image'
           initial={{opacity:0, y:35, transition: {duration: 1.5}}} 
           animate={{opacity: 1, y:0, transition: {duration: 1.5}}}
           >
           {image && 
           
           
           <Image
              src={imageBuilder(image)
                    .height(450)
                    .width(450)
                    .url()}
              height={450}
              width={450}
              layout='intrinsic'
              alt={image.alt}
            />  
              }
              </motion.div>
              <div className='right'>
              <Heading initial={{opacity:0, y:35, transition: {duration: 1}}} animate={{opacity: 1, y:0, transition: {duration: 1}}}>{title}</Heading>
               <p>Episode Number: {episodeNumber} </p>
              {description && ( <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} /> )}
              <PodcastIcons variants={animatedicons}>
              <h6>Listen to the Episode</h6>
              <SiGooglepodcasts/> <SiSpotify/> <SiApplepodcasts/>
              </PodcastIcons>
              </div>
              
           </Flex>
          </Card>
          </AnimatePresence> 
          
        
        </Flex>
      
        <H2>View the Next episode  </H2>
      {allEpisodes && (
        <Fragment>

        <H4>List of all episodes</H4>
        
        <Flex width='90vw' flexDir='row' smFlexDir='row'>
        <Grid>
        <InnerGrid>
          <ListItem>Episode Number</ListItem>

          <ListItem>Published On</ListItem>
          <ListItem>Title</ListItem>
          <ListItem>Link</ListItem>
        </InnerGrid>
     
         {allEpisodes.map((elist) => (
          <InnerGrid key={elist._id}>
          <ListItem>{elist.episodeNumber}</ListItem>
          <ListItem><Date dateString={elist.date} /></ListItem>
          <ListItem>{elist.title}</ListItem>
          <ListItem>{elist.slug}</ListItem>
          </InnerGrid>
        ))}
        </Grid>
        </Flex>
        
        </Fragment>
      )}
        </Content>
    
         </MainContainer>
         </Fragment>
    )
}

export default EpisodesPage

export async function getStaticProps({ preview = false }) {
  const site = await getSiteData()
  const allEpisodes = await getAllEpisodes(preview)
  
  return {
    props: { allEpisodes, preview, site },
    revalidate: 1
   }
}
