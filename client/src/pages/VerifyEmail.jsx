import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import Typewriter from "../features/Typewriter/Typewriter"
import { Spinner } from "flowbite-react"
import EmailPendingPix from "../assets/verifyEmail/email.png"
import EmailCheckedPix from "../assets/verifyEmail/check-mail.png"
import EmailErrorPix from "../assets/verifyEmail/error-mail.png"

const VerifyEmail = () => {
  const { token } = useParams()
  const [message, setMessage] = useState(
    "Please check your email for a confirmation link.",
  )
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("awaiting")
  const verificationAttemptedRef = useRef(false)

  useEffect(() => {
    if (currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || verificationAttemptedRef.current) {
        return
      }

      try {
        setLoading(true)
        setStatus("pending")
        verificationAttemptedRef.current = true
        const response = await axios.get(`/api/auth/verify-email/${token}`)
        setMessage(response.data)
        setStatus("verified")
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred")
        setStatus("error")
      } finally {
        setLoading(false)
      }
    }

    if (token && !verificationAttemptedRef.current) {
      verifyEmail()
    }
  }, [token])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center">
          <Spinner size="xl" />
          <span className="pl-3">Loading...</span>
        </div>
      )
    }

    switch (status) {
      case "verified":
        return (
          <div className="p-6 lg:mt-12">
            <img
              src={EmailCheckedPix}
              alt="Email verified"
              className="mx-auto h-56 w-56 md:h-96 md:w-96"
            />
            <p className="mt-6 text-center text-xl text-green-600">
              Email verified successfully!
            </p>
            <p className="mt-6 text-center text-xl text-zinc-600 dark:text-zinc-400">
              You can now{" "}
              <a href="/sign-in" className="text-teal-500 hover:underline">
                sign in
              </a>{" "}
              with your email and password.
            </p>
          </div>
        )
      case "error":
        return (
          <div className="p-6 lg:mt-12">
            <img
              src={EmailErrorPix}
              alt="Error verifying email"
              className="mx-auto h-56 w-56 md:h-96 md:w-96"
            />
            <p className="mt-6 text-center text-xl text-red-600">
              Email verification failed...
            </p>
            <p className="mt-6 text-center text-xl text-zinc-600 dark:text-zinc-400">
              You can retry to{" "}
              <a href="/sign-up" className="text-teal-500 hover:underline">
                sign up in 1 hour.
              </a>
            </p>
          </div>
        )
      default:
        return (
          <div className="p-6 lg:mt-12">
            <img
              src={EmailPendingPix}
              alt="Email pending"
              className="mx-auto h-56 w-56 md:h-96 md:w-96"
            />
            <p className="mt-6 text-center text-xl">{message}</p>
            <p className="mt-6 text-center text-xl">
              If you {"haven't"} received it, please make sure to check your
              spam folder.
            </p>
          </div>
        )
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="my-8 w-full bg-gradient-to-r from-orange-800 via-orange-400 to-orange-800 bg-clip-text text-center text-3xl font-bold text-transparent md:text-6xl">
        <Typewriter text="Email validation" delay={100} />
      </h1>
      {renderContent()}
      <p className="mt-auto w-full text-center">(Details: {message})</p>
    </main>
  )
}

export default VerifyEmail
