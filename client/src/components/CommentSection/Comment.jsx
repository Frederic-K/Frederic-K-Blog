import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useGetAuthorQuery } from "../../services/slices/postApi"
import axios from "axios"
import { addToast } from "../../services/slices/toastSlice"
import CommentHeader from "./CommentComponents/CommentHeader"
import CommentContent from "./CommentComponents/CommentContent"
import CommentActions from "./CommentComponents/CommentActions"
import EditCommentForm from "./CommentComponents/EditCommentForm"

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetAuthorQuery(comment.userId)

  useEffect(() => {
    if (userError) {
      dispatch(addToast({ type: "error", message: userError.message }))
    }
  }, [userError])

  if (isUserLoading) {
    return <div>Loading user...</div>
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleSaveEdit = async (newContent) => {
    try {
      await axios.patch(`/api/comment/editComment/${comment._id}`, {
        content: newContent,
      })
      setIsEditing(false)
      setEditedContent(newContent)
      onEdit(comment, newContent)
      dispatch(
        addToast({ type: "success", message: "Comment edited successfully" }),
      )
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }

  return (
    <div className="flex border-b p-4 text-sm dark:border-zinc-600">
      <div className="mr-3 hidden flex-shrink-0 md:flex">
        <img
          className="h-10 w-10 rounded-full bg-zinc-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <CommentHeader user={user} createdAt={comment.createdAt} />

        {isEditing ? (
          <EditCommentForm
            editedContent={editedContent}
            handleSaveEdit={handleSaveEdit}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <CommentContent content={comment.content} />
            <CommentActions
              comment={comment}
              currentUser={currentUser}
              onLike={onLike}
              handleEdit={handleEdit}
              onDelete={onDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}
