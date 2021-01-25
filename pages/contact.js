import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";    
import {Fragment} from 'react'
import Head from 'next/head'
import { Flex, Container30, ContainerLeft60, ImageContainer } from '../components/layout/pageStyles'
import { shrinkLabel } from '../styles/mixin'
import MainContainer from '../components/layout/MainContainer'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { getClient, imageBuilder } from '../lib/sanity'

const contactQuery = groq`*[_type == "contact"][0]{
  title,
  body,
  image
}`

const siteContactQuery = groq`*[_type == "siteConfig"][0]{
  logo
}`


const FormWrapper = styled.div`
$sub-color: dodgerblue;
$main-color: white;


.group {
  position: relative;
  margin: 45px 0;

  input {
    background: none;
    background-color: none;
    color: $sub-color;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
      ${shrinkLabel};
    }
  }

  textarea {
    background: none;
    background-color: none;
    color: $sub-color;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    resize: none;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
      ${shrinkLabel};
    }
  }

  label {
    color: $sub-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    &.shrink {
      ${shrinkLabel};
    }
  }
}
.custom-button {
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: white;
  color: black;
  text-transform: uppercase;
  border-radius: 1rem;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: dodgerblue;
    color: black;
    border: 1px solid white;
  }
}
.errorMsg {
  color: tomato;

}
`

const formSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  message: Yup.string().required("Required")
});

const ContactPage = ({contact, sitecontact}) => {
  const {image} = contact
  const { logo } = sitecontact
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "https://formspree.io/f/mjvplplw",
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
        <MainContainer logo={logo} navpagetitle='Contact us'>
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
  const contact = await getClient().fetch(contactQuery);
  const sitecontact = await getClient().fetch(siteContactQuery);
  return {
      props: {
          contact: contact,
          sitecontact: sitecontact,
      },
      revalidate: 1,
   }
}
