import {Fragment} from 'react'
import styled from 'styled-components'
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

const Card = styled.div`
display: grid;
width: 85%;
@media (max-width: 950px) {
  width: 90%;
} 
@media (max-width: 850px) {
  width: 100%;
} 
height: 100%;
background-color: white;
`


const EpisodesPage = ({siteepisode, episode}) => {
  const {logo} = siteepisode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups Podcast</title>
        </Head>
        <MainContainer navpagetitle='Episodes' logo={logo}>
          <Flex>
           <Card>Hi</Card>
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
