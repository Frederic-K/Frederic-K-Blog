/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import Lightbox from "./Lightbox"
import { navigateImage } from "../../../utils/helpers/carouselUtils"
import CarouselControls from "./CarouselControls"

const CarouselComponent = ({ post }) => {
  const { images, title } = post
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (images.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [images.length, isPaused])

  const goToSlide = (index) => setCurrentIndex(index)

  const handleNavigate = (direction) => {
    setCurrentIndex((prevIndex) =>
      navigateImage(direction, prevIndex, images.length),
    )
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mx-auto h-56 max-w-4xl sm:h-64 lg:h-80 2xl:h-96"
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-zinc-200/50 dark:bg-zinc-800/50">
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${title} - ${index + 1}`}
              className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setLightboxOpen(true)}
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2 lg:p-4">
              <CarouselControls
                direction="prev"
                onClick={() => handleNavigate("prev")}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 lg:p-4">
              <CarouselControls
                direction="next"
                onClick={() => handleNavigate("next")}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

export default CarouselComponent
