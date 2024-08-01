import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { Formik, Form } from "formik"
import axios from "axios"
import { addToast } from "../services/slices/toastSlice"
import validationSchema from "../utils/validation/forgotPasswordValidationSchema"
import FormField from "../components/FormField/FormField"
import SubmitButton from "../components/SubmitButton/SubmitButton"
import forgotPassword from "../assets/recoveryPassword/forgot-password.png"
import forgotPasswordEmail from "../assets/recoveryPassword/forgot-password-email.png"
import forgotPasswordEmailError from "../assets/recoveryPassword/forgot-password-email-error.png"

const INITIAL_VALUES = { email: "" }

const ForgotPassword = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [imgSrc, setImgSrc] = useState(forgotPassword)

  if (currentUser) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", values)
      dispatch(
        addToast({
          type: "success",
          message:
            typeof response.data === "string"
              ? response.data
              : "Reset link sent successfully",
        }),
      )
      setImgSrc(forgotPasswordEmail)
      resetForm()
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message: error.response?.data?.message || "An error occurred",
        }),
      )
      setImgSrc(forgotPasswordEmailError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <section className="mt-12 flex flex-col items-center gap-6 lg:mt-24">
        <img className="h-40 w-40" src={imgSrc} alt="Forgot Password" />
        <h1 className="mb-12 w-full text-center text-3xl font-bold text-zinc-800 lg:text-4xl dark:text-zinc-300">
          Forgot Password
        </h1>
      </section>
      <section className="w-full max-w-md">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <FormField
                name="email"
                label="Your Email"
                type="email"
                placeholder="Enter your email"
              />
              <SubmitButton
                isSubmitting={isSubmitting}
                submittingText="Sending..."
                defaultText="Send Reset Link"
              />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default ForgotPassword
