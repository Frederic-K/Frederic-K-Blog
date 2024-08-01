import { useGetAuthorQuery } from "../../../services/slices/postApi"
import { BsDot } from "react-icons/bs"

const AuthorInfo = ({ userId, updatedAt, contentLength }) => {
  const { data: author, isLoading, error } = useGetAuthorQuery(userId)

  if (!userId || typeof userId !== "string") return null

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!author) {
    return <div>Author not found</div>
  }

  const readTime = Math.round(contentLength / 1000)

  return (
    <div className="flex flex-col items-end justify-center">
      <div className="mb-2 mt-2 flex items-center text-sm">
        <img
          src={author?.profilePicture || "default-avatar-url"}
          alt={author?.username || "User"}
          className="mr-2 h-8 w-8 rounded-full"
        />
        <span>{author?.username || "Anonymous"}</span>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap text-xs">
        <span>{new Date(updatedAt).toLocaleDateString()}</span>
        <BsDot className="hidden md:block" />
        <span className="hidden italic md:block">{readTime} mins read</span>
      </div>
    </div>
  )
}

export default AuthorInfo
