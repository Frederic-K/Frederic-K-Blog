import { Link } from "react-router-dom"
import { useGetPostsQuery } from "../../../services/slices/postApi"
import PostOverlay from "./PostOverlay"
import DefaultPix from "../../../assets/defaultPix/DefaultPix.webp"

const CarouselItem = ({ postId, index, currentIndex, setIsPaused }) => {
  const { data: postData, isLoading, error } = useGetPostsQuery({ postId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const post = postData?.posts[0]

  if (!post) {
    return <div>No post data available</div>
  }

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
    >
      <Link
        to={`/post/${post.slug}`}
        className="block h-full w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={post.images[0] || DefaultPix}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <PostOverlay postId={postId} />
      </Link>
    </div>
  )
}

export default CarouselItem
