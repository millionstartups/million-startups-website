import { useState, useEffect } from 'react'
import { getSiteData } from '../lib/api'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";    
import {Fragment} from 'react'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer, FormWrapper } from '../components/layout/pageStyles'
import MainContainer from '../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../lib/sanity'

const contactQuery = groq`*[_type == "contact"][0]{
  title,
  body,
  image
}`



const formSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  message: Yup.string().required("Required")
});

const ContactPage = ({contact, site}) => {
  const {image} = contact
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: `${process.env.NEXT_FORMSPREE_ENDPOINT}`,
      data: values
    })
      .then(response => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks!");
      })
      .catch(error => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };
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
        if (confirm('We have new content, Do you want to reload to update?')) {
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
        <title>Contact - Million Startups Podcast</title>
        </Head>
        <MainContainer 
          navpagetitle='Contact us'
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
          <Flex smFlexDir='column-reverse'>
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
           <ContainerLeft60>
           <FormWrapper>
           <Formik
           initialValues={{ fullname: "", email: "", message: "" }}
           onSubmit={handleOnSubmit}
           validationSchema={formSchema}
         >
           {({ isSubmitting }) => (
             <Form id="fs-frm" noValidate>
             {serverState && (
              <p className={!serverState.ok ? "errorMsg" : ""}>
                {serverState.msg}
              </p>
            )}
              <div className='group'>
               <label className='shrink' htmlFor="fullname">Full Name</label>
               <Field id="fullname" type="text" name="fullname" />
               <ErrorMessage name="fullname" className="errorMsg" component="p" />
               </div>
               
               <div className='group'>
               <label className="shrink" htmlFor="email">Email</label>
               <Field id="email" type="email" name="email" />
               <ErrorMessage name="email" className="errorMsg" component="p" />
               </div>
               
               <div className='group'>
               <label className="shrink" htmlFor="message">Message</label>
               <Field id="message" name="message" component="textarea" />
               <ErrorMessage name="message" className="errorMsg" component="p" />
               </div>
              
               <button className="custom-button" type="submit" disabled={isSubmitting}>
                 Submit
               </button>
             </Form>
           )}
         </Formik>
         </FormWrapper>
            </ContainerLeft60>
          </Flex>
         </MainContainer>
         </Fragment>
    )
}

export default ContactPage

export async function getStaticProps() {
  const site = await getSiteData()
  const contact = await getClient().fetch(contactQuery);
  return {
      props: {
          contact: contact,
          site: site,
      },
      revalidate: 1,
   }
}
