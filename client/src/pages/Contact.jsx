import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Formik, Form } from "formik"
import axios from "axios"
import { addToast } from "../services/slices/toastSlice"
import contactValidationSchema from "../utils/validation/contactValidationSchema"
import FormField from "../components/FormField/FormField"
import TextAreaField from "../components/ContactComponents/TextAreaField"
import SubmitButton from "../components/SubmitButton/SubmitButton"

const INITIAL_VALUES = {
  name: "",
  email: "",
  confirmEmail: "",
  subject: "",
  message: "",
}

const Contact = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/api/send/contact", values)
      dispatch(addToast({ type: "success", message: response }))
      resetForm()
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Contact</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={contactValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-4">
            <FormField name="name" label="Name" type="text" />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400 dark:text-zinc-500"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                disabled
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                className="mt-1 block w-full rounded-md border-zinc-300 bg-zinc-100 p-2 text-zinc-400 shadow-sm sm:text-sm dark:bg-zinc-700 dark:text-zinc-400"
              />
            </div>
            <FormField name="confirmEmail" label="Confirm email" type="email" />
            <FormField name="subject" label="Subject" type="text" />
            <TextAreaField
              label="Message"
              name="message"
              cols="30"
              rows="5"
              maxLength={200}
              value={values.message}
            />
            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                submittingText="Submitting..."
                defaultText="Submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Contact
