import moment from "moment"

export default function CommentHeader({ user, createdAt }) {
  return (
    <div className="mb-1 flex items-center">
      <span className="mr-1 truncate text-xs font-semibold text-zinc-600 dark:text-zinc-400">
        {user ? `@${user.username}` : "anonymous user"}
      </span>
      <span className="text-xs font-medium text-zinc-500">
        {moment(createdAt).fromNow()}
      </span>
    </div>
  )
}
