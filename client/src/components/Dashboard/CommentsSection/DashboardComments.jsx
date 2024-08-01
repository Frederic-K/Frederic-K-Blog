import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { addToast } from "../../../services/slices/toastSlice"
import CommentTable from "./CommentTable"
import DeleteModal from "../DeleteModal"
import ShowMoreButton from "../ShowMoreButton"

const COMMENTS_PER_PAGE = 9

export default function DashboardComments() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])
  const [commentIdToDelete, setCommentIdToDelete] = useState("")
  const [showMore, setShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const fetchComments = useCallback(
    async (startIndex = 0) => {
      if (!currentUser.isVerified || !currentUser.isAdmin) return

      try {
        const { data } = await axios.get("/api/comment/getComments", {
          params: { startIndex },
        })
        setComments((prev) =>
          startIndex === 0 ? data.comments : [...prev, ...data.comments],
        )
        setShowMore(data.comments.length >= COMMENTS_PER_PAGE)
      } catch (error) {
        dispatch(addToast({ type: "error", message: error.message }))
      }
    },
    [currentUser.isAdmin, currentUser.isVerified],
  )

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleShowMoreComments = () => fetchComments(comments.length)

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/api/comment/deleteComment/${commentIdToDelete}`)
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentIdToDelete),
      )
      setOpenModal(false)
      dispatch(
        addToast({ message: "Comment deleted successfully", type: "success" }),
      )
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }

  const handleDeleteClick = (id) => {
    setOpenModal(true)
    setCommentIdToDelete(id)
  }

  if (!currentUser.isVerified || !currentUser.isAdmin) {
    return <p>You are not authorized to view this page.</p>
  }

  return (
    <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-auto overflow-x-scroll p-3 md:mx-auto">
      {comments.length > 0 ? (
        <>
          <CommentTable comments={comments} onDeleteClick={handleDeleteClick} />
          {showMore && <ShowMoreButton onClick={handleShowMoreComments} />}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <DeleteModal
        show={openModal}
        type="comment"
        onClose={() => setOpenModal(false)}
        onDelete={handleDeleteComment}
      />
    </div>
  )
}
