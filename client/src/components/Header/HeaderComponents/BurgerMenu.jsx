/* eslint-disable react/prop-types */
const BurgerMenu = ({ props }) => {
  const { isOpen, setIsOpen } = props
  return (
    <button
      type="button"
      id="mobile-menu-button"
      // onClick={() => toggleOpenMenu()}
      onClick={() => setIsOpen(!isOpen)}
      className={isOpen ? "open group peer" : "group peer"}
    >
      <div className="relative top-0 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:top-2 group-open:rotate-45"></div>
      <div className="mt-1 h-1 w-8 rounded-full bg-zinc-200 opacity-100 transition-all group-open:opacity-0"></div>
      <div className="relative top-0 mt-1 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:-top-2 group-open:-rotate-45"></div>
    </button>
  )
}

export default BurgerMenu
