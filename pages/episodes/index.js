import {Fragment} from 'react'
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

const EpisodesPage = ({siteepisode, episode}) => {
  const {logo} = siteepisode
    return (
        <Fragment>
        <Head>
        <title>Episodes - Million Startups Podcast</title>
        </Head>
        <MainContainer logo={logo}>
          <Flex>
           <ContainerLeft60>
             <TitleHeading>million<br/>startups</TitleHeading>
             <p>
            under construction
             </p> 
            </ContainerLeft60>
            <Container30>
            Coming soon...
              <ImageContainer>
                <img src="/listening-walking.svg" alt='walking' style={{height: '100%', width: '100%'}} />
              </ImageContainer>
            </Container30>
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
