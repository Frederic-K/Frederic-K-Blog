const CarouselDots = ({ postsLength, currentIndex, handleDotClick }) => (
  <div className="absolute bottom-4 left-4 z-20 flex space-x-2 md:bottom-8 md:left-6">
    {Array.from({ length: postsLength }).map((_, index) => (
      <button
        key={index}
        onClick={() => handleDotClick(index)}
        className={`h-2 w-2 rounded-full ${
          index === currentIndex ? "bg-zinc-200" : "bg-zinc-400"
        }`}
      />
    ))}
  </div>
)

export default CarouselDots
