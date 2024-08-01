import { useSelector } from "react-redux"
import Toast from "./Toast"

const ToastContainer = () => {
  const toasts = useSelector((state) => state.toast)

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col space-y-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

export default ToastContainer
