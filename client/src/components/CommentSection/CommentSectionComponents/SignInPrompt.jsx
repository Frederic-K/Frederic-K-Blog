import { Link } from "react-router-dom"

export default function SignInPrompt() {
  return (
    <div className="my-5 text-sm text-gray-500">
      You must be signed in to comment.
      <Link to="/sign-in" className="ml-1 text-blue-500 hover:underline">
        Sign In
      </Link>
    </div>
  )
}
