import { Spinner } from "flowbite-react"

const CommentSubmitButton = ({ isSubmitting }) => (
  <div className="w-[84px] rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 p-[2px]">
    <button
      type="submit"
      disabled={isSubmitting}
      className="h-10 w-20 rounded-lg bg-zinc-100 font-semibold text-zinc-800 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200"
    >
      {isSubmitting ? (
        <>
          <Spinner size="sm" />
          <span className="mr-2">Posting...</span>
        </>
      ) : (
        "Post"
      )}
    </button>
  </div>
)

export default CommentSubmitButton
