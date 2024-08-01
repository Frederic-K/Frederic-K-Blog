import { Link } from "react-router-dom"
import {
  HiChartPie,
  HiOutlineUserGroup,
  HiDocumentText,
  HiAnnotation,
} from "react-icons/hi"
import { IoIosCreate } from "react-icons/io"

const adminLinks = [
  {
    to: "/dashboard?tab=dashboard",
    icon: <HiChartPie />,
    label: "Dashboard",
    tag: "dashboard",
  },
  {
    to: "/dashboard?tab=users",
    icon: <HiOutlineUserGroup />,
    label: "Users",
    tag: "users",
  },
  {
    to: "/dashboard?tab=posts",
    icon: <HiDocumentText />,
    label: "Posts",
    tag: "posts",
  },
  {
    to: "/dashboard?tab=comments",
    icon: <HiAnnotation />,
    label: "Comments",
    tag: "comments",
  },
]

export default function AdminLinks({ tab }) {
  return (
    <>
      {adminLinks.map((adminLink) => (
        <Link
          key={adminLink.tag}
          to={adminLink.to}
          className={`${tab === adminLink.tag ? "rounded-md bg-zinc-200 text-zinc-800" : ""} flex w-full items-center gap-2 p-2 text-lg text-zinc-500 transition-all duration-300 hover:rounded-md hover:bg-zinc-200 hover:text-zinc-800`}
        >
          {adminLink.icon} {adminLink.label}
        </Link>
      ))}
      <Link
        to="/create-post"
        className="flex w-full items-center gap-2 p-2 text-lg text-zinc-500 transition-all duration-300 hover:rounded-md hover:bg-zinc-200 hover:text-teal-500"
      >
        <IoIosCreate /> Create a post
      </Link>
    </>
  )
}
