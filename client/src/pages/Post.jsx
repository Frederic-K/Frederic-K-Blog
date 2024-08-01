import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useGetPostsQuery } from "../services/slices/postApi"
import { addToast } from "../services/slices/toastSlice"
import { Spinner } from "flowbite-react"
import CallToAction from "../components/CallToAction/CallToAction"
import CommentSection from "../components/CommentSection/CommentSection"
import CarouselComponent from "../components/PostComponents/Carousel/Carousel"
import LikeButton from "../components/PostComponents/LikeButton"
import PostMetadataHeader from "../components/PostComponents/PostMetadataHeader"
import PostMetadataContent from "../components/PostComponents/PostMetadataContent"
import PostContent from "../components/PostContent/PostContent"
import RecentArticles from "../components/RecentArticles/RecentArticles"

export default function Post() {
  const { postSlug } = useParams()
  const dispatch = useDispatch()

  const {
    data: postData,
    isLoading,
    error,
  } = useGetPostsQuery({ slug: postSlug })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  }

  if (error) {
    dispatch(addToast({ type: "error", message: "Failed to fetch post" }))
    return <div>Error loading post</div>
  }

  const post = postData?.posts[0]

  if (!post) {
    dispatch(addToast({ type: "error", message: "Post not found" }))
    return <div>Post not found</div>
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col p-3">
      <PostMetadataHeader post={post} />
      <div className="relative w-full">
        <CarouselComponent post={post} />
        <div className="absolute -bottom-7 left-0 right-0 flex justify-center">
          <LikeButton />
        </div>
      </div>
      <PostMetadataContent post={post} />
      <PostContent content={post.content} />
      <div className="mx-auto mt-5 max-w-4xl bg-amber-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} postTitle={post.title} />
      <RecentArticles limit={3} />
    </main>
  )
}
