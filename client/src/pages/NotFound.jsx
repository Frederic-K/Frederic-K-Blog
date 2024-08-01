// Router
import { Link } from "react-router-dom"
// Icons
import { AiOutlineHome } from "react-icons/ai"

const NotFound = () => {
  return (
    <div className="bg- flex min-h-screen flex-col items-center justify-center text-center text-zinc-600 dark:text-zinc-300">
      <h1 className="mb-4 text-9xl font-bold">404</h1>
      <p className="mb-8 text-2xl">
        {"Oops! The page you're looking for doesn't exist."}
      </p>
      <Link
        to="/"
        className=" mb-4 flex transform items-center justify-center rounded-full bg-gradient-to-t from-orange-500 via-orange-400 to-orange-500 px-6 py-3 text-xl font-semibold text-zinc-100 shadow-lg transition-transform hover:scale-110 hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 hover:text-zinc-200"
      >
        <AiOutlineHome className="mr-3" size={28} />
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
