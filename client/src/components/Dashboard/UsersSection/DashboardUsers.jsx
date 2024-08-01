import { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getStorage, ref, deleteObject } from "firebase/storage"
import axios from "axios"
import { addToast } from "../../../services/slices/toastSlice"
import { app } from "../../../services/firebase/config"

import DeleteModal from "../DeleteModal"
import UsersTable from "./UsersTable"
import ShowMoreButton from "../ShowMoreButton"

const USERS_PER_PAGE = 9

export default function DashboardUsers() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const storage = getStorage(app)
  const [users, setUsers] = useState([])
  const [userIdToDelete, setUserIdToDelete] = useState("")
  const [showMore, setShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const fetchUsers = useCallback(
    async (startIndex = 0) => {
      if (!currentUser.isVerified || !currentUser.isAdmin) return

      try {
        const { data } = await axios.get("/api/user/getUsers", {
          params: { startIndex },
        })
        setUsers((prev) =>
          startIndex === 0 ? data.users : [...prev, ...data.users],
        )
        setShowMore(data.users.length >= USERS_PER_PAGE)
      } catch (error) {
        dispatch(addToast({ type: "error", message: "Failed to fetch users" }))
      }
    },
    [currentUser.isVerified, currentUser.isAdmin],
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleShowMoreUsers = () => fetchUsers(users.length)

  const deleteProfilePicture = async (profilePictureUrl) => {
    if (!profilePictureUrl) return

    try {
      const imageRef = ref(storage, profilePictureUrl)
      await deleteObject(imageRef)
    } catch (error) {
      console.error("Failed to delete profile picture:", error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const userToDelete = users.find((user) => user._id === userIdToDelete)
      await axios.delete(`/api/user/delete/${userIdToDelete}`)
      await deleteProfilePicture(userToDelete.profilePicture)

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userIdToDelete),
      )
      setOpenModal(false)
      dispatch(
        addToast({ message: "User deleted successfully", type: "success" }),
      )
    } catch (error) {
      console.error("Error deleting user:", error)
      dispatch(addToast({ type: "error", message: "Failed to delete user" }))
    }
  }

  const handleDeleteClick = (id) => {
    setOpenModal(true)
    setUserIdToDelete(id)
  }

  if (!currentUser.isVerified || !currentUser.isAdmin) {
    return <p>You are not authorized to view this page.</p>
  }

  return (
    <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-4 table-auto overflow-x-scroll p-3 md:mx-auto">
      {users.length > 0 ? (
        <>
          <UsersTable users={users} handleDeleteClick={handleDeleteClick} />
          {showMore && <ShowMoreButton onClick={handleShowMoreUsers} />}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <DeleteModal
        show={openModal}
        type="user"
        onClose={() => setOpenModal(false)}
        onDelete={handleDeleteUser}
      />
    </div>
  )
}
