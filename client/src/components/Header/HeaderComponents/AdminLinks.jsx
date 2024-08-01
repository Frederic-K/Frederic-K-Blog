import { Link } from "react-router-dom"
import { Dropdown } from "flowbite-react"

const AdminLinks = ({ tab }) => {
  const adminLinks = [
    { name: "Dashboard", path: "/dashboard?tab=dashboard", tag: "dashboard" },
    { name: "Users", path: "/dashboard?tab=users", tag: "users" },
    { name: "Posts", path: "/dashboard?tab=posts", tag: "posts" },
    { name: "Comments", path: "/dashboard?tab=comments", tag: "comments" },
  ]

  return (
    <>
      {adminLinks.map((adminLink) => (
        <div key={adminLink.name}>
          <Link to={adminLink.path}>
            <Dropdown.Item
              className={`${tab === adminLink.tag && "border-l-2 border-zinc-400"} hover:border-l-2 hover:border-zinc-400`}
            >
              {adminLink.name}
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
        </div>
      ))}
      <Link to={"/create-post"}>
        <Dropdown.Item className="hover:border-l-2 hover:border-zinc-400 hover:text-teal-500 dark:hover:text-teal-500">
          Create a post
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider />
    </>
  )
}

export default AdminLinks
