import { FaThumbsUp } from "react-icons/fa"

export default function CommentActions({
  comment,
  currentUser,
  onLike,
  handleEdit,
  onDelete,
}) {
  return (
    <div className="flex max-w-fit items-center gap-2 border-t pt-2 text-xs dark:border-zinc-700">
      <button
        type="button"
        onClick={() => onLike(comment._id)}
        className={`text-zinc-400 hover:text-orange-700 ${
          currentUser &&
          currentUser.isVerified &&
          comment.likes.includes(currentUser._id) &&
          "!text-orange-700"
        }`}
      >
        <FaThumbsUp className="text-sm" />
      </button>
      <p className="text-zinc-600 dark:text-zinc-300">
        {comment.numberOfLikes > 0 &&
          comment.numberOfLikes +
            " " +
            (comment.numberOfLikes === 1 ? "like" : "likes")}
      </p>
      {currentUser &&
        currentUser.isVerified &&
        (currentUser._id === comment.userId || currentUser.isAdmin) && (
          <>
            <button
              type="button"
              onClick={handleEdit}
              className="font-semibold text-zinc-600 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-500"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(comment._id)}
              className="font-semibold text-zinc-600 hover:text-red-500 dark:text-zinc-300 dark:hover:text-red-500"
            >
              Delete
            </button>
          </>
        )}
    </div>
  )
}
