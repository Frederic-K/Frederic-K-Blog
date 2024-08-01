import { Spinner } from "flowbite-react"
import PostCard from "../../components/PostCard/PostCard"
import { useDispatch } from "react-redux"
import { addToast } from "../../services/slices/toastSlice"
import { useGetPostsQuery } from "../../services/slices/postApi"

export default function RecentArticles({ limit }) {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useGetPostsQuery({ limit: limit })

  if (error) {
    console.error("Failed to fetch recent posts:", error)
    dispatch(
      addToast({ type: "error", message: "Failed to fetch recent posts" }),
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mx-auto">
          <Spinner size="sm" />
          <span className="pl-3">Loading...</span>
        </div>
      )
    }

    if (!data?.posts || data.posts.length === 0) {
      return <p className="mx-auto mt-5">No recent articles found.</p>
    }

    return (
      <div className="mt-5 flex flex-wrap justify-center gap-5">
        {data.posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-5 flex flex-col items-center justify-center">
      <h1 className="mt-5 text-xl">Recent articles</h1>
      {renderContent()}
    </div>
  )
}
