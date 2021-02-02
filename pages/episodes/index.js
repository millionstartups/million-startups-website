import {Fragment} from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Flex, Card} from '../../components/layout/pageStyles'
import MainContainer from '../../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../../lib/sanity'
import {SiGooglepodcasts, SiSpotify} from 'react-icons/si'

const Heading = styled(motion.h1)`
font-size: 2rem;
`

const PodcastIcons = styled(motion.div)`
font-size: 2rem;
margin: 2rem 0;
`

const episodeQuery = groq`*[_type == "episode"][0]{
  title, description, image, episodeNumber
}`

const siteEpisodeQuery = groq`*[_type == "siteConfig"][0]{
  logo
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


const EpisodesPage = ({siteepisode, episode}) => {
  const {logo} = siteepisode
  const {title, episodeNumber, image, description} = episode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups</title>
        </Head>
        <MainContainer navpagetitle='Episodes' logo={logo}>
          <Flex>
          <AnimatePresence>
           <Card variants={animatedcard}
            >
            <Flex smFlexDir='column-reverse'>
            {image && 
              <motion.div layout className='left' initial={{opacity:0, y:35, transition: {duration: 1.5}}} animate={{opacity: 1, y:0, transition: {duration: 1.5}}}> 
             
              <Image
                layout 
                src={imageBuilder(image)
                      .height(450)
                      .width(450)
                      .url()}
                height={450}
                width={450}
                layout='intrinsic'
                alt={image.alt}
              /></motion.div>    
                }
                <div className='right'>
                <Heading initial={{opacity:0, y:35, transition: {duration: 1}}} animate={{opacity: 1, y:0, transition: {duration: 1}}}>{title}</Heading>Episode number:{episodeNumber}
                <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
                <PodcastIcons variants={animatedicons}>
                <h6>Listen to the Episode</h6>
                <SiGooglepodcasts/> <SiSpotify/>
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

export async function getStaticProps() {
  const episode = await getClient().fetch(episodeQuery);
  const siteepisode = await getClient().fetch(siteEpisodeQuery);
  return {
      props: {
          episode: episode,
          siteepisode:siteepisode,
      },
      revalidate: 1,
   }
}
