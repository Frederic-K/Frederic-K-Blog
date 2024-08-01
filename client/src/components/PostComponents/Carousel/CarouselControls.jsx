import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

const CarouselControls = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="text-white transition-colors duration-200 hover:text-gray-300"
  >
    {direction === "prev" ? (
      <BsArrowLeftCircleFill className="text-2xl text-zinc-400 hover:text-orange-700 lg:text-3xl" />
    ) : (
      <BsArrowRightCircleFill className="text-2xl text-zinc-400 hover:text-orange-700 lg:text-3xl" />
    )}
  </button>
)

export default CarouselControls
