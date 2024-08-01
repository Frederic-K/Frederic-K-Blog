import { NavLink } from "react-router-dom"

const NavLinks = ({ setIsOpen }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <>
      {links.map((link, idx) => (
        <NavLink
          key={`${link.name}-${idx}`}
          to={link.path}
          onClick={() => setIsOpen && setIsOpen(false)}
          className={({ isActive }) =>
            `${isActive ? "bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text text-transparent" : "text-zinc-200 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:bg-clip-text hover:text-transparent"} text-lg font-bold`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  )
}

export default NavLinks
