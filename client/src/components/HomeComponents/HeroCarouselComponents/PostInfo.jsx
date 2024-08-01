import { useGetPostsQuery } from "../../../services/slices/postApi"
import PostContent from "../../PostContent/PostContent"

const PostInfo = ({ postId }) => {
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
    <div className="mb-2 max-w-96 md:mb-6 md:ml-2">
      <p className="-ml-1 mb-2 w-28 rounded-full bg-zinc-300/50 p-1 text-center text-sm font-semibold md:w-36 md:p-2">
        {post.category}
      </p>
      <h2 className="max-w-48 truncate text-xl font-semibold md:max-w-96 md:text-2xl md:font-bold">
        {post.title}
      </h2>
      <PostContent
        className="mb-2 line-clamp-1 max-w-52 text-sm md:line-clamp-2"
        content={post.content}
      />
    </div>
  )
}

export default PostInfo
