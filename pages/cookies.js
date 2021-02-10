import {Fragment} from 'react'
import { groq } from 'next-sanity'
import { getSiteData } from '../lib/api'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../lib/sanity'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, TitleHeading } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'



const cookiesQuery = groq`*[_type == "frontpage"][0]{
   title,
   body,
   image,
   mainlogo
 }`



const CookiesPage = ({index, site}) => {
    const {body, image, title} = index
    const {logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud} = site

    return (
        <Fragment>
        <Head>
        <title>{title}</title>
        </Head>
        <MainContainer 
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
          <Flex>
           <h1>Make cookie policy</h1>
          </Flex>
         </MainContainer>
         </Fragment>
    )
}

export default CookiesPage


export async function getStaticProps() {
  const site = await getSiteData() 
  const index = await getClient().fetch(cookiesQuery);
  return {
      props: {
          index: index,
          site: site,
      },
      revalidate: 1,
   }
}
