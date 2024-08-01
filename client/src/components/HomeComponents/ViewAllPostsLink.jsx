import { Link } from "react-router-dom"
import { HiRocketLaunch } from "react-icons/hi2"

export default function ViewAllPostsLink({ className = "" }) {
  return (
    <Link
      to="/posts"
      className={`text-md flex items-center gap-2 font-bold text-orange-700 hover:underline sm:text-lg ${className}`}
    >
      <span>View all posts</span> <HiRocketLaunch className="-mb-1" />
    </Link>
  )
}
