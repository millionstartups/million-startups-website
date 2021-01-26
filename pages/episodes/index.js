import {Fragment} from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, TitleHeading } from '../../components/layout/pageStyles'
import MainContainer from '../../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../../lib/sanity'

const episodeQuery = groq`*[_type == "frontpage"][0]{
  image
}`

const siteEpisodeQuery = groq`*[_type == "siteConfig"][0]{
  logo
}`

const Card = styled(motion.div)`
color: black;
border-radius: 2rem;
display: flexbox;
justify-content: center;
align-items: center;
width: 85%;
@media (max-width: 950px) {
  width: 90%;
} 
@media (max-width: 850px) {
  width: 100%;
} 
height: 400px;
background-color: white;
`

const animatedcard = {
  loaded: { 
      y: 0,
      transition: {
      duration: .7,
    } 
  },
  removed: { 
      y: '-100%',
      transition: {
      duration: .7,
    }  
  },
}

const EpisodesPage = ({siteepisode, episode}) => {
  const {logo} = siteepisode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups Podcast</title>
        </Head>
        <MainContainer navpagetitle='Episodes' logo={logo}>
          <Flex>
          <AnimatePresence>
           <Card initial={{ opacity: 0, scale: .69, x:'+100%', transition: {
            duration: .8}}}
           animate={{ opacity: 1, scale: 1, x: 0,transition: {
            duration: .8} }}
           exit={{ opacity: 0, scale: .69, x:'-100%', transition: {
            duration: .8} }}>coming soon...</Card>
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
