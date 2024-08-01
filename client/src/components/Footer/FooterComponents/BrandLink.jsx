import { Link } from "react-router-dom"

const BrandLink = () => (
  <article>
    <Link
      to="/"
      className="self-center whitespace-nowrap text-lg font-semibold sm:text-xl"
    >
      <span className="bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text py-1 pr-2 font-bold text-transparent">
        {"Frederic-K's"}
      </span>
      <span className="text-zinc-300">Blog</span>
    </Link>
  </article>
)

export default BrandLink
