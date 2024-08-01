import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { addToast } from "../../services/slices/toastSlice"
import UserInfo from "./CommentSectionComponents/UserInfo"
import SignInPrompt from "./CommentSectionComponents/SignInPrompt"
import CommentForm from "./CommentSectionComponents/CommentForm"
import CommentList from "./CommentSectionComponents/CommentList"
import DeleteModal from "./CommentSectionComponents/DeleteModal"

export default function CommentSection({ postId, postTitle }) {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [comments, setComments] = useState([])
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/comment/getPostComments/${postId}`)
      setComments(data)
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (comment) => {
    try {
      const { data } = await axios.post("/api/comment/create", {
        content: comment,
        postId,
        postTitle,
        userId: currentUser._id,
        userEmail: currentUser.email,
      })
      setComments([data, ...comments])
      dispatch(
        addToast({ type: "success", message: "Comment added successfully" }),
      )
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }

  const handleEdit = (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c,
      ),
    )
  }

  const handleDelete = async (commentId) => {
    setOpenModal(false)
    if (!currentUser || !currentUser.isVerified) {
      navigate("/sign-in")
      return
    }

    try {
      await axios.delete(`/api/comment/deleteComment/${commentId}`)
      setComments(comments.filter((c) => c._id !== commentId))
      dispatch(
        addToast({ type: "success", message: "Comment deleted successfully" }),
      )
    } catch (error) {
      dispatch(addToast({ type: "error", message: "Failed to delete comment" }))
    }
  }

  const handleLike = async (commentId) => {
    if (!currentUser || !currentUser.isVerified) {
      navigate("/sign-in")
      return
    }

    try {
      const { data } = await axios.patch(
        `/api/comment/likeComment/${commentId}`,
      )
      setComments(
        comments.map((c) =>
          c._id === commentId
            ? { ...c, likes: data.likes, numberOfLikes: data.likes.length }
            : c,
        ),
      )

      const isLiked = data.likes.includes(currentUser._id)
      dispatch(
        addToast({
          type: "success",
          message: isLiked
            ? "Comment liked successfully"
            : "Comment unliked successfully",
        }),
      )
    } catch (error) {
      dispatch(addToast({ type: "error", message: error.message }))
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-3">
      {currentUser && currentUser.isVerified ? (
        <UserInfo user={currentUser} />
      ) : (
        <SignInPrompt />
      )}
      {currentUser && currentUser.isVerified && (
        <CommentForm onSubmit={handleSubmit} />
      )}
      <CommentList
        comments={comments}
        handleLike={handleLike}
        handleEdit={handleEdit}
        setOpenModal={setOpenModal}
        setCommentToDelete={setCommentToDelete}
      />
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
        commentToDelete={commentToDelete}
      />
    </div>
  )
}
