import { Fragment, useState, useCallback } from 'react'
import styled from 'styled-components'
import { shrinkLabel } from '../../styles/mixin'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";    

const Container = styled.div`
max-width: 860px;
margin: 3rem;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export const MailFormWrapper = styled.div`


.group {
  position: relative;
  margin: 30px 0;

  input {
    background: none;
    background-color: none;
    color: black;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid black;
    margin: 10px 0;

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
    color: black;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    resize: none;
    border-radius: 0;
    border-bottom: 1px solid black;
    margin: 10px 0;

    &:focus {
      outline: none;
    }

    &:active ~ label {
      ${shrinkLabel};
    }
  }

  label {
    color: black;
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
  background-color: black;
  color: whitesmoke;
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
    border: 1px solid black;
  }
}
.errorMsg {
  color: rgba(255,99,71,.7);
  position: absolute;
  top: -18px;
  left: 75px;
  z-index: -1;
}
`

const Message = styled.p`
max-width: 300px;
text-align: center;
`

const formSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});

export default function MailingListForm () {
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };
  const handleOnSubmit = async (values, actions) => {
    try {
      response = await fetch('/api/createMailContact', {
        method: 'POST',
        body: JSON.stringify(values),
        type: 'application/json'
      })
      .then(
      actions.setSubmitting(false),
      actions.resetForm(),
      handleServerResponse(true, "Thanks for subscribing!"))
    } catch (err) {
      actions.setSubmitting(false);
      handleServerResponse(false, error.response.data.error);
    }
  };
    return (
    
    <MailFormWrapper>
      <Container>
           
           <Formik
           initialValues={{ name: "", email: ""}}
           onSubmit={handleOnSubmit}
           validationSchema={formSchema}
         >
        
           {({ isSubmitting }) => (
              <Fragment>
              {!serverState && (
              <Fragment>
              <h4>Sign up for the mailing list</h4>
            
              <Form id="fs-frm" noValidate>
             
              <div className='group'>
               <label className='shrink' htmlFor="name">Name</label>
               <Field tabIndex='0' id="name" type="text" name="name" />
               <ErrorMessage name="name" className="errorMsg" component="p" />
               </div>
               
               <div className='group'>
               <label className="shrink" htmlFor="email">Email</label>
               <Field tabIndex='0' id="email" type="email" name="email" />
               <ErrorMessage name="email" className="errorMsg" component="p" />
               </div>
            
           
               <button className="custom-button" tabIndex='0' type="submit" disabled={isSubmitting}>
                 Sign Up
               </button>
              
             </Form>
             </Fragment>
              )}

             {serverState && (
              <Message className={!serverState.ok ? "errorMsg" : ""}>
                {serverState.msg}
              </Message>
            )}
           </Fragment>
           )} 
           
         </Formik> 
         </Container>
         </MailFormWrapper>
        
)
}
