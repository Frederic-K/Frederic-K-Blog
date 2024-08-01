import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { addToast } from "../services/slices/toastSlice"
import { Formik, Form } from "formik"

import validationSchema from "../utils/validation/signUpValidationSchema"
import SignHeroTitle from "../components/SignComponent/SignHeroTitle"
import FormField from "../components/FormField/FormField"
import PasswordField from "../components/PasswordField/PasswordField"
import AuthenticateButton from "../components/AuthenticateButton/AuthenticateButton"
import OAuth from "../features/auth/OAuth/OAuth"

const INITIAL_VALUES = { username: "", email: "", password: "" }

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("/api/auth/signup", values, {
        headers: { "Content-Type": "application/json" },
      })
      dispatch(addToast({ type: "success", message: "Sign up successful" }))
      navigate("/verify-email")
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message:
            error.response?.data?.message || "An error occurred during sign up",
        }),
      )
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <main className="mt-20 min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 p-3 md:flex-row md:items-center">
        <div className="mx-auto w-full max-w-[350px]">
          <SignHeroTitle />
        </div>
        <div className="flex-1">
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mb-4 flex flex-col gap-4">
                <FormField
                  name="username"
                  label="Your Name"
                  placeholder="Your Name"
                />
                <FormField
                  name="email"
                  label="Your Email"
                  type="email"
                  placeholder="Your Email"
                />
                <PasswordField
                  name="password"
                  label="Your Password"
                  placeholder="Your Password"
                />
                <AuthenticateButton
                  isSubmitting={isSubmitting}
                  text="Sign Up"
                />
              </Form>
            )}
          </Formik>
          <OAuth />
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-teal-500">
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
