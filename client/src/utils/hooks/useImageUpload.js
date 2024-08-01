import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToast } from "../../services/slices/toastSlice"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../../services/firebase/config"

const storage = getStorage(app)

export const useImageUpload = () => {
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [imageUploadProgress, setImageUploadProgress] = useState(0)

  const uploadPostPix = async (files, setFieldValue) => {
    if (!files.length) {
      dispatch(
        addToast({
          type: "error",
          message: "Please select at least one image",
        }),
      )
      return
    }
    if (files.length > 3) {
      dispatch(
        addToast({
          type: "error",
          message: "You can only select up to 3 images",
        }),
      )
      return
    }

    setIsUploading(true)

    try {
      const uploadPromises = files.map((file) =>
        uploadFile(file, setImageUploadProgress),
      )
      const newDownloadURLs = await Promise.all(uploadPromises)
      setFieldValue("images", (prevImages) => [
        ...prevImages,
        ...newDownloadURLs,
      ])
      dispatch(
        addToast({ type: "success", message: "Images uploaded successfully" }),
      )
      return newDownloadURLs // Return the new URLs
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message: error.message || "Image upload failed",
        }),
      )
    } finally {
      setImageUploadProgress(0)
      setIsUploading(false)
    }
  }

  const uploadFile = (file, progressCallback) => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        reject(
          new Error(`Image ${file.name} is too large. Maximum size is 2MB`),
        )
      }

      const fileName = new Date().getTime() + "-" + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          progressCallback(progress)
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        },
      )
    })
  }

  return { uploadPostPix, isUploading, imageUploadProgress }
}
