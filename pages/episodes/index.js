import {Fragment, useEffect} from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Flex, Card} from '../../components/layout/pageStyles'
import MainContainer from '../../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../../lib/sanity'
import { FaBorderNone } from 'react-icons/fa'


const Heading = styled.h1`
font-size: 2rem;
`

const episodeQuery = groq`*[_type == "episode"][0]{
  title, description, image, episodeNumber
}`

const siteEpisodeQuery = groq`*[_type == "siteConfig"][0]{
  logo
}`


const animatedcard = {
  initial: {
      transitionStart: {display: 'none'}, 
      x: 60,
      transition: {
      duration: .7,
    } 
  },
  animate: { 
      x: 0,
      transition: {
      duration: .7,
    },
    transitionEnd: {display: 'flex'}  
  },
}

const EpisodesPage = ({siteepisode, episode}) => {
  const {logo} = siteepisode
  const {title, episodeNumber, image, description} = episode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups Podcast</title>
        </Head>
        <MainContainer navpagetitle='Episodes' logo={logo}>
          <Flex>
           <Card variants={animatedcard}
            >
            <Flex layout>
            
            {image && 
              <div className='left'> 
              <Image
                layout 
                src={imageBuilder(image)
                      .height(500)
                      .width(500)
                      .url()}
                priority 
                height={500}
                width={500}
                layout='intrinsic'
                alt={image.alt}
              /></div>    
                }
                <div className='right'>
                <Heading>{title}</Heading>Episode number:{episodeNumber}
                <BlockContent blocks={description} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
               </div>
             </Flex>
            </Card>
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
