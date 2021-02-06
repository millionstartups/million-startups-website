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



const IndexPage = ({index}) => {
    const {body, image, title} = index
    return (
        <Fragment>
        <Head>
        <title>{title}</title>
        </Head>
        <MainContainer 

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
  const queryClient = new QueryClient()
   await queryClient.prefetchQuery('site', getSiteData, {staleTime: 10000, cacheTime: Infinity, refetchOnReconnect: "always"})
  const index = await getClient().fetch(indexQuery);
  return {
      props: {
          index: index,
          dehydratedState: dehydrate(queryClient),
      },
      revalidate: 1,
   }
}
