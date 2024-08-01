import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Typewriter from "../../features/Typewriter/Typewriter"
import LogoFKWhite from "/images/logo/LogoFK-waterpx-wht-100px.png"
import LogoFKBlack from "/images/logo/LogoFK-waterpx-black-100px.png"

const TitleLogo = () => {
  const { theme } = useSelector((state) => state.theme)

  return (
    <>
      <Link
        to="/"
        aria-label="Link to Home page"
        className="flex items-center whitespace-nowrap text-3xl font-bold lg:text-4xl dark:text-zinc-300"
      >
        <span className="rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 px-2 py-1 text-zinc-200">
          <Typewriter text="Frederic-Ks" delay={100} />
        </span>
        <span className="animate-fadeIn animation-delay-1500 ml-2 opacity-0">
          Blog
        </span>
        <span className="ml-2">
          <img
            src={theme === "light" ? LogoFKBlack : LogoFKWhite}
            className="animate-fadeIn animation-delay-1500 h-8 w-8 opacity-0 lg:h-12 lg:w-12"
            alt="Logo"
          />
        </span>
      </Link>
    </>
  )
}

export default TitleLogo
