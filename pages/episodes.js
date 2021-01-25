import {Fragment} from 'react'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, TitleHeading } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../lib/sanity'

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
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/favicons/site.webmanifest"/>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="shortcut icon" href="/favicons/favicon.ico"/>
        <meta name="apple-mobile-web-app-title" content="The Million Startups"/>
        <meta name="application-name" content="The Million Startups"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
        <meta name="theme-color" content="#ffffff"/>
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
