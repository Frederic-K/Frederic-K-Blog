import { useState } from "react"
import { navigateImage } from "../../../utils/helpers/carouselUtils"
import CarouselControls from "./CarouselControls"
import { AiFillCloseCircle } from "react-icons/ai"

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex)

  const handleNavigate = (direction) => {
    setCurrentImageIndex((prevIndex) =>
      navigateImage(direction, prevIndex, images.length),
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/95 transition-opacity duration-300 ease-in-out">
      <div className="mx-auto w-full max-w-4xl transform transition-transform duration-300 ease-in-out">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Lightbox image ${index + 1}`}
                className="h-full w-full flex-shrink-0 object-contain"
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          {images.length > 1 && (
            <CarouselControls
              direction="prev"
              onClick={() => handleNavigate("prev")}
            />
          )}
          <button
            onClick={onClose}
            className="flex w-full items-center justify-center text-white transition-colors duration-200 hover:text-gray-300"
          >
            <AiFillCloseCircle
              size={36}
              className="text-zinc-400 hover:text-orange-700"
            />
          </button>
          {images.length > 1 && (
            <CarouselControls
              direction="next"
              onClick={() => handleNavigate("next")}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Lightbox
