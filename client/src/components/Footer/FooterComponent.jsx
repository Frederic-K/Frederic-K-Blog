import { Footer } from "flowbite-react"
import BrandLink from "./FooterComponents/BrandLink"
import SocialIcons from "./FooterComponents/SocialIcons"
import Copyright from "./FooterComponents/Copyright"

const FooterComponent = () => {
  return (
    <Footer
      container
      className="border-t-8 border-orange-600/50 bg-[url('/images/background/origamiBanner.webp')] bg-cover bg-center bg-no-repeat dark:bg-zinc-800"
    >
      <section className="flex w-full flex-wrap justify-between gap-3">
        <BrandLink />
        <SocialIcons />
        <Copyright />
      </section>
    </Footer>
  )
}

export default FooterComponent
