import {Fragment} from 'react'
import styled from 'styled-components'
import { groq } from 'next-sanity'
import { getSiteData } from '../lib/api'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../lib/sanity'
import Head from 'next/head'
import { Flex } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'

const ContentBody = styled.div`
max-width: 60rem;
padding-left: 1rem;
padding-right: 1rem;
`


const cookiesQuery = groq`*[_type == "cookies"][0]{
   title,
   body,
   image
 }`


const CookiesPage = ({cookies, site}) => {
    const {body, image, title} = cookies
    const {logo, facebook, twitter, linkedin, youtube, googlepodcast, applepodcast, spotify, tiktok, amazonmusic, soundcloud} = site

    return (
        <Fragment>
        <Head>
        <title>{title} - The Million Startups</title>
        </Head>
        <MainContainer 
          navpagetitle={title}
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
          <ContentBody>
          <BlockContent blocks={body} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
          </ContentBody>
          </Flex>
         </MainContainer>
         </Fragment>
    )
}

export default CookiesPage


export async function getStaticProps() {
  const site = await getSiteData() 
  const cookies = await getClient().fetch(cookiesQuery);
  return {
      props: {
          cookies: cookies,
          site: site,
      },
      revalidate: 1,
   }
}
