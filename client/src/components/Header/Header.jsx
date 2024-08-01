import { useEffect, useState, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import BurgerMenu from "./HeaderComponents/BurgerMenu"
import NavLinks from "./HeaderComponents/NavLinks"
import Logo from "./HeaderComponents/Logo"
import ThemeToggle from "./HeaderComponents/ThemeToggle"
import UserMenu from "./HeaderComponents/UserMenu"
import SignInButton from "./HeaderComponents/SignInButton"

const Header = () => {
  const location = useLocation()
  const { currentUser } = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState("")
  const menuRef = useRef()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  return (
    <nav className="top-0 z-10 flex h-16 justify-between border-b-2 border-orange-900 bg-[url('/images/background/origamiBanner.webp')] bg-cover bg-center bg-no-repeat">
      <Logo />
      <section className="flex">
        <div
          ref={menuRef}
          className="order-2 flex cursor-pointer flex-col justify-center px-4 md:hidden"
        >
          <BurgerMenu props={{ setIsOpen, isOpen }} />
          <div className="absolute left-0 top-[62px] w-full origin-top-right scale-y-0 bg-zinc-800 py-2 transition-transform peer-open:z-30 peer-open:flex peer-open:origin-top-right peer-open:scale-y-100 peer-open:flex-col peer-open:items-center peer-open:justify-center">
            <NavLinks setIsOpen={setIsOpen} />
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-4 px-4 md:flex">
          <NavLinks />
        </div>
        <div className="flex items-center justify-center gap-2 md:px-4">
          <ThemeToggle />
          {currentUser ? <UserMenu tab={tab} /> : <SignInButton />}
        </div>
      </section>
    </nav>
  )
}

export default Header
