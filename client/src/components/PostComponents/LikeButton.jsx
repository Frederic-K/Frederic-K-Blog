import { useParams } from "react-router-dom"
import { AiFillHeart } from "react-icons/ai"
import {
  useGetPostsQuery,
  useLikePostMutation,
} from "../../services/slices/postApi"
import { useDispatch, useSelector } from "react-redux"
import { addToast } from "../../services/slices/toastSlice"

export default function LikeButton() {
  const { postSlug } = useParams()
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { data: postData } = useGetPostsQuery({ slug: postSlug })
  const [likePost, { isLoading }] = useLikePostMutation()

  const post = postData?.posts[0]
  const isLiked = post?.likes.includes(currentUser?._id)
  const likesCount = post?.numberOfLikes || 0

  const handleLike = async () => {
    if (!currentUser || !currentUser.isVerified) {
      dispatch(
        addToast({ type: "error", message: "Please log in to like posts" }),
      )
      return
    }

    try {
      await likePost(post._id).unwrap()
      dispatch(
        addToast({
          type: "success",
          message: isLiked ? "Post unliked" : "Post liked",
        }),
      )
    } catch (error) {
      console.error("Error liking/unliking post:", error)
      dispatch(
        addToast({ type: "error", message: "Failed to like/unlike post" }),
      )
    }
  }

  if (!currentUser) {
    return (
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-zinc-800 shadow-md">
        <AiFillHeart className="text-3xl text-red-500" />
        <span className="absolute right-2 top-[14px] text-sm font-bold text-zinc-200">
          {likesCount}
        </span>
      </div>
    )
  }

  if (currentUser && currentUser.isVerified) {
    return (
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-zinc-800 shadow-md">
        <button
          onClick={handleLike}
          className="group focus:outline-none"
          disabled={isLoading}
        >
          <AiFillHeart
            className={`text-3xl ${isLiked ? "text-red-500" : "text-amber-500"} transition-transform duration-200 ease-in-out group-hover:scale-110`}
          />
          <span className="absolute right-2 top-[14px] text-sm font-bold text-zinc-200">
            {likesCount}
          </span>
        </button>
      </div>
    )
  }

  return null
}
