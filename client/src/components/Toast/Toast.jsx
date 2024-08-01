import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { removeToast } from "../../services/slices/toastSlice"
import {
  ExclamationCircleIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const Toast = ({ id, type, message }) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => dispatch(removeToast(id)), 300) // Wait for exit animation
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, dispatch])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => dispatch(removeToast(id)), 300) // Wait for exit animation
  }

  return (
    <div
      className={`mb-4 flex items-center justify-between rounded-lg ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } ${isVisible ? "animate-toast-enter" : "animate-toast-exit"} p-4 text-white shadow-lg`}
    >
      <div className="flex items-center">
        {type === "error" ? (
          <ExclamationCircleIcon className="mr-2 h-6 w-6 animate-pulse" />
        ) : (
          <HandThumbUpIcon className="mr-2 h-6 w-6 animate-bounce" />
        )}
        <p>{message}</p>
      </div>
      <button onClick={handleClose} className="ml-4 focus:outline-none">
        <XMarkIcon className="h-5 w-5 text-white hover:text-gray-200" />
      </button>
    </div>
  )
}

export default Toast
