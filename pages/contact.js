import { useState } from 'react'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
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

const ContactPage = ({contact}) => {
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
    return (
        <Fragment>
        <Head>
        <title>Contact - Million Startups Podcast</title>
        </Head>
        <MainContainer 
          navpagetitle='Contact us'
        >
          <Flex>
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
            Fill out the form to contact us
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
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('site', getSiteData, 
  {cacheTime: 500000, staleTime: 1000000,  refetchOnMount: 'always', retry: 'always'}
  )
  const contact = await getClient().fetch(contactQuery);
  return {
      props: {
          contact: contact,
          dehydratedState: dehydrate(queryClient),
      },
      revalidate: 1,
   }
}
