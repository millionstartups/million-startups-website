import {Fragment, useEffect} from 'react'
import { groq } from 'next-sanity'
import { getSiteData } from '../lib/api'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import { getClient, imageBuilder } from '../lib/sanity'
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
    useEffect(() => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        const wb = window.workbox
        // add event listeners to handle any of PWA lifecycle event
        // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
        wb.addEventListener('installed', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
  
        wb.addEventListener('controlling', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
  
        wb.addEventListener('activated', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
  
        // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
        // NOTE: MUST set skipWaiting to false in next.config.js pwa object
        // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
        const promptNewVersionAvailable = event => {
          // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
          // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
          // You may want to customize the UI prompt accordingly.
          if (confirm('We have new content. Do you want to reload to update?')) {
            wb.addEventListener('controlling', event => {
              window.location.reload()
            })
  
            // Send a message to the waiting service worker, instructing it to activate.
            wb.messageSW({ type: 'SKIP_WAITING' })
          } else {
            console.log(
              'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
            )
          }
        }
  
        wb.addEventListener('waiting', promptNewVersionAvailable)
        wb.addEventListener('externalwaiting', promptNewVersionAvailable)
  
        // ISSUE - this is not working as expected, why?
        // I could only make message event listenser work when I manually add this listenser into sw.js file
        wb.addEventListener('message', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
  
        /*
        wb.addEventListener('redundant', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
        wb.addEventListener('externalinstalled', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
        wb.addEventListener('externalactivated', event => {
          console.log(`Event ${event.type} is triggered.`)
          console.log(event)
        })
        */
  
        // never forget to call register as auto register is turned off in next.config.js
        wb.register()
      }
    }, []) 
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
