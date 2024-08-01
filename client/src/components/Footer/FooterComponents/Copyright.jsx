import { Footer } from "flowbite-react"

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const Copyright = () => (
  <article className="flex items-center justify-center">
    <Footer.Copyright
      by="Frederic-K's blog"
      year={new Date().getFullYear()}
      className="cursor-pointer text-zinc-300"
      onClick={scrollToTop}
    />
  </article>
)

export default Copyright
