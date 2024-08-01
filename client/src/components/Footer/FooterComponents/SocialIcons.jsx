import { Footer } from "flowbite-react"
import {
  SiGooglemaps,
  SiGmail,
  SiLinkedin,
  SiGithub,
  SiBiolink,
} from "react-icons/si"

const FOOTER_LINKS = [
  {
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/frédéric-kreuder",
    text: "LinkedIn",
    ariaLabel: "Link to my LinkedIn",
  },
  {
    icon: SiGithub,
    href: "https://github.com/Frederic-K/Frederic-K",
    text: "Github",
    ariaLabel: "Link to my Github",
  },
  {
    icon: SiGmail,
    href: "mailto:frederic.kreuder.pro@gmail.com",
    text: "Mail",
    ariaLabel: "Link to my mail",
  },
  {
    icon: SiGooglemaps,
    href: "https://maps.google.com?q=48.60564521247025, 7.74840158205735",
    text: "Location Maps",
    ariaLabel: "Link to my location",
  },
  {
    icon: SiBiolink,
    href: "https://frederic-k-letsmeet.netlify.app/",
    text: "Live CV",
    ariaLabel: "Link to my live CV",
  },
]

const SocialIcons = () => (
  <article className="flex items-center justify-center gap-6 md:order-2">
    {FOOTER_LINKS.map((link) => (
      <Footer.Icon
        key={link.text}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        icon={link.icon}
        aria-label={link.ariaLabel}
        className="text-zinc-300 hover:text-zinc-100"
      />
    ))}
  </article>
)

export default SocialIcons
