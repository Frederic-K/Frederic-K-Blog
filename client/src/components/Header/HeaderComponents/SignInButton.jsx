import { useNavigate } from "react-router-dom"

const SignInButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate("/sign-in")}
      type="button"
      className="whitespace-nowrap rounded-md bg-gradient-to-br from-red-700 via-orange-400 to-yellow-400 px-2 py-3 text-center text-xs font-bold text-zinc-800 hover:bg-gradient-to-bl focus:ring-2 focus:ring-orange-200 sm:rounded-lg sm:px-5 sm:text-sm dark:focus:ring-orange-800"
    >
      Sign In
    </button>
  )
}

export default SignInButton
