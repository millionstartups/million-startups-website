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
