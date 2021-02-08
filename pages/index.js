import { groq } from 'next-sanity'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getSiteData } from '../lib/api'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../lib/sanity'
import {Fragment} from 'react'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, TitleHeading } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'


const indexQuery = groq`*[_type == "frontpage"][0]{
   title,
   body,
   image,
   mainlogo
 }`



const IndexPage = ({index, site}) => {
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
           <ContainerLeft60>
            <TitleHeading><div className='spacing'>million Startups</div></TitleHeading>
             <BlockContent blocks={body} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} />
            </ContainerLeft60>
            <Container30>
              <ImageContainer>
              {image && 
                     
                <Image 
                  src={imageBuilder(image)
                        .height(300)
                        .width(300)
                        .url()} 
                  priority
                  width={300}
                  height={300}
                  layout='intrinsic'
                  alt={image.alt}
                />
                  }
              </ImageContainer>
            </Container30>
          </Flex>
         </MainContainer>
         </Fragment>
    )
}

export default IndexPage


export async function getStaticProps() {
  const site = await getSiteData() 
  const index = await getClient().fetch(indexQuery);
  return {
      props: {
          index: index,
          site: site,
      },
      revalidate: 1,
   }
}
