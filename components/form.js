import {FormWrapper} from './layout/pageStyles'
import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";    



const formSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  comment: Yup.string().required("Required")
});

export default function CommentForm ({_id}) {
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };
  const handleOnSubmit = async (values, actions) => {
    try {
      response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(values),
        type: 'application/json'
      })
      .then(
      actions.setSubmitting(false),
      actions.resetForm(),
      handleServerResponse(true, "Thanks! Your comment will show after moderation."))
    } catch (err) {
      actions.setSubmitting(false);
      handleServerResponse(false, error.response.data.error);
    }
  };
  return (
    <FormWrapper>
           <Formik
           initialValues={{ name: "", email: "", comment: "" }}
           onSubmit={handleOnSubmit}
           validationSchema={formSchema}
         >
           {({ isSubmitting }) => (
             <Form id="fs-frm" noValidate>
             
              <div className='group'>
              <Field type="hidden" name="_id" value={_id}/>
               <label className='shrink' htmlFor="name">Name</label>
               <Field id="name" type="text" name="name" />
               <ErrorMessage name="name" className="errorMsg" component="p" />
               </div>
               
               <div className='group'>
               <label className="shrink" htmlFor="email">Email</label>
               <Field id="email" type="email" name="email" />
               <ErrorMessage name="email" className="errorMsg" component="p" />
               </div>
               
               <div className='group'>
               <label className="shrink" htmlFor="comment">Comment</label>
               <Field id="comment" name="comment" component="textarea" />
               <ErrorMessage name="comment" className="errorMsg" component="p" />
               </div>
               {serverState && (
                <p className={!serverState.ok ? "errorMsg" : ""}>
                  {serverState.msg}
                </p>
              )}
               <button className="custom-button" type="submit" disabled={isSubmitting}>
                 Submit
               </button>
               
             </Form>
           )}
         </Formik>
         </FormWrapper>
)
}
