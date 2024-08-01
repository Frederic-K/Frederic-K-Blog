import { Link } from "react-router-dom"

export default function Description() {
  return (
    <p className="text-md font-bold text-zinc-800 sm:text-lg dark:text-zinc-400">
      <span className="text-orange-700">
        This is a demo MERN-Stack Project v.1 :{" "}
      </span>
      <span className="font-semibold">
        to have fun {"you'll"} find some articles on my passions such as
        crafting, gardening, cooking, gaming and of course web development
        (maybe some few fakes to feed the blog 😜). Want to learn more about
        this project ? check the{" "}
        <Link to="/about" className="text-teal-500 hover:underline">
          About page.
        </Link>
      </span>
    </p>
  )
}
