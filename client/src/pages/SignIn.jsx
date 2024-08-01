import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Formik, Form } from "formik"
import axios from "axios"
import { addToast } from "../services/slices/toastSlice"
import { signInSuccess } from "../services/slices/userSlice"
import validationSchema from "../utils/validation/signInValidationSchema"
import SignHeroTitle from "../components/SignComponent/SignHeroTitle"
import FormField from "../components/FormField/FormField"
import PasswordField from "../components/PasswordField/PasswordField"
import AuthenticateButton from "../components/AuthenticateButton/AuthenticateButton"
import OAuth from "../features/auth/OAuth/OAuth"

const INITIAL_VALUES = {
  email: "",
  password: "",
}

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await axios.post("/api/auth/signin", values, {
        headers: { "Content-Type": "application/json" },
      })
      dispatch(signInSuccess(data))
      dispatch(addToast({ type: "success", message: "Sign in successful" }))
      navigate("/")
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message:
            error.response?.data?.message || "An error occurred during sign in",
        }),
      )
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <main className="mt-6 min-h-screen md:mt-20">
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
              <Form className="flex flex-col gap-4">
                <FormField
                  name="email"
                  label="Your email"
                  type="email"
                  placeholder="xyz@provider.com"
                />
                <PasswordField
                  name="password"
                  label="Your Password"
                  placeholder="************"
                />
                <AuthenticateButton
                  isSubmitting={isSubmitting}
                  text="Sign In"
                />
                <OAuth />
              </Form>
            )}
          </Formik>
          <section className="flex flex-col md:flex md:flex-row md:justify-between">
            <div className="mt-5 flex gap-2 text-sm">
              <span>No account yet ?</span>
              <Link to="/sign-up" className="text-teal-500">
                <span>Sign up!</span>
              </Link>
            </div>
            <div className="mt-5 flex gap-2 text-sm">
              <span>Or did you:</span>
              <Link to="/forgot-password" className="text-teal-500">
                forgot password?
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
