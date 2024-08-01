import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Formik, Form, Field } from "formik"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import axios from "axios"

import { addToast } from "../../../services/slices/toastSlice"
import { updateSuccess, clearUser } from "../../../services/slices/userSlice"
import { handleSignout } from "../../../features/auth/AuthUtils/authUtils"
import { app } from "../../../services/firebase/config"
import validationSchema from "../../../utils/validation/updatePasswordValidationSchema"

import FormField from "../../FormField/FormField"
import PasswordField from "../../PasswordField/PasswordField"
import SubmitButton from "../../SubmitButton/SubmitButton"
import DeleteModal from "../DeleteModal"
import { TextInput } from "flowbite-react"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const storage = getStorage(app)
  const filePickerRef = useRef()

  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (imageFile) {
      uploadUserPix()
    }
  }, [imageFile])

  const handleUserPixChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const uploadUserPix = async () => {
    if (imageFile.size > MAX_FILE_SIZE) {
      dispatch(
        addToast({
          type: "error",
          message: "Could not upload image (File must be less than 2MB)",
        }),
      )
      resetImageState()
      return
    }

    setImageFileUploading(true)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        dispatch(
          addToast({
            type: "error",
            message: "Could not upload image (File must be less than 2MB)",
          }),
        )
        resetImageState()
        console.log("Upload error: ", error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setFormData({ ...formData, profilePicture: downloadURL })
          setImageFileUploading(false)
        })
      },
    )
  }

  const resetImageState = () => {
    setImageFileUploadProgress(null)
    setImageFile(null)
    setImageFileUrl(null)
    setImageFileUploading(false)
  }

  const deletePreviousUserPix = async (imageUrl) => {
    if (!imageUrl) return
    const imageRef = ref(storage, imageUrl)
    try {
      await deleteObject(imageRef)
      console.log("Old image deleted successfully")
    } catch (error) {
      console.error("Error deleting old image:", error)
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedFields = {
      ...(values.username !== currentUser.username && {
        username: values.username,
      }),
      ...(values.password &&
        values.confirmPassword && { password: values.password }),
      ...(formData.profilePicture !== currentUser.profilePicture && {
        profilePicture: formData.profilePicture,
      }),
    }

    if (Object.keys(updatedFields).length === 0) {
      setSubmitting(false)
      return
    }

    try {
      const res = await axios.patch(
        `/api/user/update/${currentUser._id}`,
        updatedFields,
      )
      dispatch(updateSuccess(res.data))
      dispatch(
        addToast({
          type: "success",
          message: "User's profile updated successfully",
        }),
      )

      if (updatedFields.profilePicture && currentUser.profilePicture) {
        deletePreviousUserPix(currentUser.profilePicture)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      dispatch(addToast({ type: "error", message: errorMessage }))
    } finally {
      setSubmitting(false)
    }
  }

  const deleteProfilePicture = async (profilePictureUrl) => {
    if (!profilePictureUrl) return
    try {
      const imageRef = ref(storage, profilePictureUrl)
      await deleteObject(imageRef)
      console.log("Profile picture deleted successfully")
    } catch (error) {
      console.error("Error deleting profile picture:", error)
    }
  }

  const handleDeleteUser = async () => {
    setOpenModal(false)
    try {
      await deleteProfilePicture(currentUser.profilePicture)
      await axios.delete(`/api/user/delete/${currentUser._id}`)
      dispatch(clearUser())
      dispatch(
        addToast({ type: "success", message: "User deleted successfully" }),
      )
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      dispatch(addToast({ type: "error", message: errorMessage }))
    }
  }
  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <h1 className="my-5 text-center text-3xl font-semibold">Profile</h1>
      <Formik
        initialValues={{
          username: currentUser.username,
          email: currentUser.email,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleUserPixChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="relative h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
              onClick={() =>
                !imageFileUploading && filePickerRef.current.click()
              }
            >
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    text: {
                      fill: "rgba(255, 171, 90, 1",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    },
                    path: {
                      stroke: `rgba(255, 171, 90, ${imageFileUploadProgress / 100})`,
                    },
                  }}
                />
              )}
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt="Profile pix"
                className={`h-full w-full rounded-full border-8 border-zinc-400 object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}
              />
            </div>

            <FormField type="text" name="username" placeholder="Username" />
            <Field
              as={TextInput}
              type="email"
              name="email"
              disabled
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            />
            <PasswordField name="password" placeholder="New Password" />
            <PasswordField
              name="confirmPassword"
              placeholder="Confirm New Password"
            />
            <SubmitButton
              isSubmitting={isSubmitting || imageFileUploading}
              submittingText="Updating..."
              defaultText="Update"
            />
          </Form>
        )}
      </Formik>

      <div className="mt-3 flex justify-between px-1 text-red-600">
        <span
          className="cursor-pointer hover:underline hover:decoration-orange-500"
          onClick={() => setOpenModal(true)}
        >
          Delete account
        </span>
        <span
          className="cursor-pointer hover:underline hover:decoration-orange-500"
          onClick={() => handleSignout(dispatch)}
        >
          Sign out
        </span>
      </div>
      <DeleteModal
        show={openModal}
        type="account"
        onClose={() => setOpenModal(false)}
        onDelete={handleDeleteUser}
      />
    </div>
  )
}
