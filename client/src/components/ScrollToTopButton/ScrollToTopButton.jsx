import { useState, useEffect } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    setVisible(scrolled > 250)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible)
    return () => window.removeEventListener("scroll", toggleVisible)
  }, [])

  return (
    <button
      type="button"
      aria-label="scroll to top"
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-6 z-30 rounded-full bg-zinc-200 
        text-zinc-700 transition-transform dark:bg-zinc-400
        ${visible ? "scale-100 hover:scale-125 hover:shadow-lg" : "scale-0"}
      `}
    >
      <FaArrowAltCircleUp size="25px" />
    </button>
  )
}

export default ScrollToTopButton
