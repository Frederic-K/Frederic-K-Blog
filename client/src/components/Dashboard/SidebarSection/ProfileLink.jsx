import { Link } from "react-router-dom"
import { HiUser } from "react-icons/hi"

export default function ProfileLink({ tab, currentUser }) {
  return (
    <Link
      to="/dashboard?tab=profile"
      className={`${tab === "profile" ? "rounded-md bg-zinc-200 text-zinc-800" : ""} flex w-full items-center justify-between p-2 text-lg text-zinc-500 hover:rounded-md hover:bg-zinc-200 hover:text-zinc-800`}
    >
      <span className="flex items-center gap-2">
        <HiUser size={"20px"} /> Profile
      </span>
      <span className="rounded-md bg-zinc-600 px-2 py-1 text-xs font-medium text-zinc-200">
        {currentUser.isAdmin ? "Admin" : "User"}
      </span>
    </Link>
  )
}
