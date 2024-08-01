import { useSelector } from "react-redux"
import Typewriter from "../../features/Typewriter/Typewriter"
import LogoFKWhite from "/images/logo/LogoFK-waterpx-wht-100px.png"
import LogoFKBlack from "/images/logo/LogoFK-waterpx-black-100px.png"

export default function Header() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className="flex gap-2">
      <h1 className="text-3xl font-bold text-zinc-800 lg:text-6xl dark:text-zinc-300">
        <Typewriter text="Welcome to my" delay={100} />
        <span className="animate-fadeIn animation-delay-1500 bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text text-transparent opacity-0">
          {" "}
          Blog
        </span>
      </h1>
      <span className="flex items-end">
        <img
          src={theme === "light" ? LogoFKBlack : LogoFKWhite}
          alt="FK Logo"
          className="animate-fadeIn animation-delay-1500 h-8 w-8 opacity-0 lg:h-12 lg:w-12"
        />
      </span>
    </div>
  )
}
