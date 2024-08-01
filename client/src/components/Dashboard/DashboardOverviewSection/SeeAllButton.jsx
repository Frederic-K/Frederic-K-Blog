import { Link } from "react-router-dom"

const SeeAllButton = ({ to, text }) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 p-[2px]">
      <button
        type="button"
        className="flex h-9 w-20 items-center justify-center rounded-lg bg-zinc-100 font-medium text-zinc-800 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:text-zinc-100"
      >
        <Link to={to}>{text}</Link>
      </button>
    </div>
  )
}

export default SeeAllButton
