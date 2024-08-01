import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../../services/slices/themeSlice"
import { Button } from "flowbite-react"
import { FaMoon, FaSun } from "react-icons/fa"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  return (
    <Button
      className="flex h-10 w-12 items-center justify-center hover:ring-2 hover:ring-orange-300/50 focus:outline-none focus:ring-2 focus:ring-orange-300/50 dark:hover:ring-2"
      color="dark"
      pill
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </Button>
  )
}

export default ThemeToggle
