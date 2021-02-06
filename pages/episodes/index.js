import {Fragment} from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Flex, Card} from '../../components/layout/pageStyles'
import MainContainer from '../../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSiteData } from '../../lib/api'
import { imageBuilder } from '../../lib/sanity'
import { getAllEpisodesForHome } from '../../lib/api'
import {SiGooglepodcasts, SiSpotify, SiApplepodcasts} from 'react-icons/si'

const Heading = styled(motion.h1)`
font-size: 2rem;
`

const PodcastIcons = styled(motion.div)`
font-size: 2rem;
margin: 2rem 0;
`

const siteEpisodeQuery = groq`*[_type == "siteConfig"][0]{
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


const EpisodesPage = ({ allEpisodes, preview}) => {
  const homeEpisode = allEpisodes[0]
  const episode = homeEpisode
  const {title, episodeNumber, image, description} = episode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups</title>
        </Head>
        <MainContainer 
          navpagetitle='Episodes' 
          
        >
        <Flex>
        <AnimatePresence>
         <Card variants={animatedcard}
          >
          <Flex smFlexDir='column-reverse'>
          <motion.div 
           className='left'
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
              <Heading initial={{opacity:0, y:35, transition: {duration: 1}}} animate={{opacity: 1, y:0, transition: {duration: 1}}}>{title}</Heading>Episode number:{episodeNumber}
              <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
              <PodcastIcons variants={animatedicons}>
              <h6>Listen to the Episode</h6>
              <SiGooglepodcasts/> <SiSpotify/> <SiApplepodcasts/>
              </PodcastIcons>
              </div>
              
           </Flex>
          </Card>
          </AnimatePresence>
        </Flex>
         </MainContainer>
         </Fragment>
    )
}

export default EpisodesPage

export async function getStaticProps({ preview = false }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('site', getSiteData, {staleTime: 10000, cacheTime: Infinity, refetchOnReconnect: "always"})
  const allEpisodes = await getAllEpisodesForHome(preview)
  
  return {
    props: { allEpisodes, preview, dehydratedState: dehydrate(queryClient) },
    
    revalidate: 1
   }
}
