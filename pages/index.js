import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../lib/sanity'
import {Fragment} from 'react'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, TitleHeading } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'


const indexQuery = groq`*[_type == "frontpage"][0]{
   title,
   body,
   image
 }`

 const siteQuery = groq`*[_type == "siteConfig"][0]{
   'siteTitle':title,
   logo
 }`

const IndexPage = ({index, site}) => {
    const {body, image, title} = index
    const {logo} = site
    return (
        <Fragment>
        <Head>
        <title>Million Startups Podcast</title>
        </Head>
        <MainContainer logo={logo}>
          <Flex>
           <ContainerLeft60>
             <TitleHeading>million<br/>startups</TitleHeading>
             <p>
             Most startups get funded because of the founding team.
             "Million Startups" is a daily podcast where startup founders come
             to pitch their companies and talk about their esperience on the
             founding and development process in hopes that listeners invest 
             in them.
             </p> 
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
  const index = await getClient().fetch(indexQuery);
  const site = await getClient().fetch(siteQuery);
  return {
      props: {
          index: index,
          site: site,
      },
      revalidate: 1,
   }
}
