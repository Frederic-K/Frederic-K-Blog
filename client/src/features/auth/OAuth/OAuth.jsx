import { useState } from "react"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../../services/slices/userSlice"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { addToast } from "../../../services/slices/toastSlice"
import { AiFillGoogleCircle } from "react-icons/ai"
import { app } from "../../../services/firebase/config"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"

export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })

    try {
      const { user } = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL } = user

      const response = await axios.post("/api/auth/google", {
        name: displayName,
        email,
        googleAuthPhotoUrl: photoURL,
      })

      if (response.status === 200) {
        dispatch(signInSuccess(response.data))
        dispatch(
          addToast({
            message: "Welcome back, " + displayName,
            type: "success",
          }),
        )
        navigate("/")
      }
    } catch (error) {
      console.error("Google sign-in error:", error)
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }

  return (
    <>
      <div className="mx-auto w-full rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 p-[2px]">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-lg bg-zinc-100 font-semibold text-zinc-800 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200"
          onClick={handleGoogleClick}
        >
          <AiFillGoogleCircle className="mr-2 h-6 w-6" /> Continue with Google
        </button>
      </div>
    </>
  )
}
