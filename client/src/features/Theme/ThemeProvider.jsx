import { useSelector } from "react-redux"

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme}>
      <div className="min-h-screen bg-[url('/images/background/cimentLightWallpaper.webp')] bg-cover bg-center bg-no-repeat text-zinc-700 dark:bg-[url('/images/background/cimentDarkWallpaper.webp')] dark:bg-cover dark:bg-center dark:bg-no-repeat dark:text-zinc-200">
        {children}
      </div>
    </div>
  )
}
