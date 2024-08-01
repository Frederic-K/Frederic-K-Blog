import { Link } from "react-router-dom"
import LogoFKRed from "/images/logo/LogoFK-waterpx-red3-100px.png"

const Logo = () => (
  <Link
    to="/"
    className="flex items-center justify-center whitespace-nowrap px-4 text-lg font-semibold text-zinc-200 sm:text-xl"
  >
    <img src={LogoFKRed} alt="Logo FK" className="size-6 sm:size-10" />
    <span className="hidden md:flex md:bg-gradient-to-r md:from-orange-700 md:via-orange-400 md:to-orange-700 md:bg-clip-text md:px-2 md:text-xl md:font-bold md:text-transparent">
      {"Frederic-K's"}
    </span>
    <span className="flex bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text px-2 text-xl font-bold text-transparent md:hidden">
      {"FK's"}
    </span>
    <span className="md:ml-0">Blog</span>
  </Link>
)

export default Logo
