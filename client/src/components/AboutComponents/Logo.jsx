import { useSelector } from "react-redux"
import LogoFKWhite from "/images/logo/LogoFK-waterpx-wht-100px.png"
import LogoFKBlack from "/images/logo/LogoFK-waterpx-black-100px.png"

export default function Logo() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className="my-6 flex w-full items-center justify-center">
      <img
        src={theme === "light" ? LogoFKBlack : LogoFKWhite}
        className="size-8 lg:size-12"
        alt="Frederic-K's Blog Logo"
      />
    </div>
  )
}
