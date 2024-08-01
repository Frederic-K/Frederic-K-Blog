import Comment from "../Comment"

export default function CommentList({
  comments,
  handleLike,
  handleEdit,
  setOpenModal,
  setCommentToDelete,
}) {
  return (
    <div className="mt-5">
      {comments.length === 0 ? (
        <p className="my-5 text-sm">No comments yet!</p>
      ) : (
        <>
          <div className="my-5 flex items-center gap-1 text-sm">
            <p>Comments</p>
            <div className="rounded-sm border border-gray-400 px-2 py-1">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={() => {
                setOpenModal(true)
                setCommentToDelete(comment)
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
