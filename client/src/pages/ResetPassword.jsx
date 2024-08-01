import { useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Formik, Form } from "formik"
import axios from "axios"
import { addToast } from "../services/slices/toastSlice"
import validationSchema from "../utils/validation/resetPasswordValidationSchema"
import PasswordField from "../components/PasswordField/PasswordField"
import SubmitButton from "../components/SubmitButton/SubmitButton"
import resetPassword from "../assets/recoveryPassword/reset-password.png"
import resetPasswordError from "../assets/recoveryPassword/reset-password-error.png"
import resetPasswordSuccess from "../assets/recoveryPassword/reset-password-success.png"

const INITIAL_VALUES = { password: "", confirmPassword: "" }

const ResetPassword = () => {
  const { token } = useParams()
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [imgSrc, setImgSrc] = useState(resetPassword)

  if (currentUser) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, {
        password: values.password,
      })
      dispatch(addToast({ type: "success", message: response.data.message }))
      setImgSrc(resetPasswordSuccess)
      resetForm()
      dispatch(
        addToast({ type: "success", message: "You can close this window" }),
      )
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message: error.response?.data?.message || "An error occurred",
        }),
      )
      setImgSrc(resetPasswordError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <section className="mt-12 flex flex-col items-center gap-6 lg:mt-24">
        <img className="h-40 w-40" src={imgSrc} alt="Reset Password" />
        <h1 className="mb-12 w-full text-center text-3xl font-bold text-zinc-800 lg:text-4xl dark:text-zinc-300">
          Reset Password
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
              <PasswordField
                name="password"
                label="New Password"
                placeholder="Enter new password"
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm New Password"
                placeholder="Confirm new password"
              />
              <SubmitButton
                isSubmitting={isSubmitting}
                submittingText="Resetting..."
                defaultText="Reset Password"
              />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default ResetPassword
