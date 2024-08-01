import PostInfo from "./PostInfo"
import AuthorInfo from "./AuthorInfo"
import { useGetPostsQuery } from "../../../services/slices/postApi"

const PostOverlay = ({ postId }) => {
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
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 text-zinc-200">
      <div className="flex justify-between">
        <PostInfo postId={postId} />
        <AuthorInfo
          userId={post.userId}
          updatedAt={post.updatedAt}
          contentLength={post.content.length}
        />
      </div>
    </div>
  )
}

export default PostOverlay
