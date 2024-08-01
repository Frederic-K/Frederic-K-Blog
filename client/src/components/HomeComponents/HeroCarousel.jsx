import { useState, useEffect, useMemo, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useGetPostsQuery } from "../../services/slices/postApi"
import { addToast } from "../../services/slices/toastSlice"
import { navigateImage } from "../../utils/helpers/carouselUtils"
import CarouselItem from "./HeroCarouselComponents/CarouselItem"
import CarouselDots from "./HeroCarouselComponents/CarouselDots"
import { Spinner } from "flowbite-react"

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const dispatch = useDispatch()

  const { data, isLoading, error } = useGetPostsQuery({
    mostLiked: true,
    limit: 3,
    sort: "desc",
  })

  const posts = useMemo(() => data?.posts || [], [data])

  const nextSlide = useCallback(() => {
    if (!isPaused) {
      setCurrentIndex((prevIndex) =>
        navigateImage("next", prevIndex, posts.length),
      )
    }
  }, [posts.length, isPaused])

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const handleDotClick = useCallback((index) => setCurrentIndex(index), [])

  if (isLoading) {
    return (
      <div className="mx-auto">
        <Spinner size="sm" />
        <span className="pl-3">Loading...</span>
      </div>
    )
  }

  if (error) {
    dispatch(addToast({ type: "error", message: "Error loading posts" }))
    return <div className="mx-auto">Error loading posts</div>
  }

  if (!posts || posts.length === 0) return null

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-t-md md:h-[500px]">
      {posts.map((post, index) => (
        <CarouselItem
          key={post._id}
          postId={post._id}
          index={index}
          currentIndex={currentIndex}
          setIsPaused={setIsPaused}
        />
      ))}
      <CarouselDots
        postsLength={posts.length}
        currentIndex={currentIndex}
        handleDotClick={handleDotClick}
      />
    </div>
  )
}

export default HeroCarousel
