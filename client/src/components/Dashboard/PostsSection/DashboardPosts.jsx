import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStorage, ref, deleteObject } from "firebase/storage"
import { addToast } from "../../../services/slices/toastSlice"
import { app } from "../../../services/firebase/config"
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../../services/slices/postApi"
import PostsTable from "./PostsTable"
import DeleteModal from "../DeleteModal"
import { Spinner } from "flowbite-react"
import Pagination from "../Pagination"

const POSTS_PER_PAGE = 9

export default function DashboardPosts() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const storage = getStorage(app)
  const [postIdToDelete, setPostIdToDelete] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useGetPostsQuery({
    userId: currentUser._id,
    limit: POSTS_PER_PAGE,
    page: page,
  })

  const [deletePost] = useDeletePostMutation()

  const userPosts = data?.posts || []
  const totalPages = Math.ceil(data?.totalPosts / POSTS_PER_PAGE) || 1

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleDeletePost = async () => {
    try {
      const postToDelete = userPosts.find((post) => post._id === postIdToDelete)

      await deletePost({
        postId: postIdToDelete,
        userId: currentUser._id,
      }).unwrap()

      if (
        postToDelete &&
        postToDelete.images &&
        postToDelete.images.length > 0
      ) {
        for (const imageUrl of postToDelete.images) {
          const imageRef = ref(storage, imageUrl)
          await deleteObject(imageRef)
        }
      }

      setOpenModal(false)
      dispatch(
        addToast({
          type: "success",
          message: "Post and associated images deleted successfully",
        }),
      )
    } catch (error) {
      console.error("Error deleting post:", error)
      dispatch(
        addToast({
          type: "error",
          message: "Error deleting post and associated images",
        }),
      )
    }
  }

  const handleDeleteClick = (postId) => {
    setOpenModal(true)
    setPostIdToDelete(postId)
  }

  if (!currentUser.isVerified || !currentUser.isAdmin) {
    return (
      <p className="flex min-h-screen items-center justify-center">
        You are not authorized to view this page.
      </p>
    )
  }

  if (isLoading || isFetching) {
    return (
      <div className="mx-auto flex items-center">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-4 table-auto overflow-x-scroll p-3 md:mx-auto">
      {userPosts.length > 0 ? (
        <>
          <PostsTable posts={userPosts} onDelete={handleDeleteClick} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="mx-auto min-h-screen">You have no posts yet!</p>
      )}
      <DeleteModal
        show={openModal}
        type="post"
        onClose={() => setOpenModal(false)}
        onDelete={handleDeletePost}
      />
    </div>
  )
}
