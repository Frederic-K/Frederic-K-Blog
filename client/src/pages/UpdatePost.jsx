import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Formik, Form, ErrorMessage } from "formik"
import { Spinner } from "flowbite-react"
import { getStorage, ref, deleteObject } from "firebase/storage"

import { addToast } from "../services/slices/toastSlice"
import { useImageUpload } from "../utils/hooks/useImageUpload"
import validationSchema from "../utils/validation/updatePostValidationSchema"
import {
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../services/slices/postApi"
import { app } from "../services/firebase/config"

import FormField from "../components/FormField/FormField"
import CategorySelect from "../components/HandlePostComponents/CategorySelect"
import TextContentEditor from "../components/HandlePostComponents/TextContentEditor"
import SubmitButton from "../components/SubmitButton/SubmitButton"
import ImageUploader from "../components/ImageUploader/ImageUploader"

const INITIAL_POST_VALUES = {
  title: "",
  category: "uncategorized",
  content: "",
  images: [],
}

export default function UpdatePost() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const storage = getStorage(app)

  const [files, setFiles] = useState([])

  const { data, isLoading, error } = useGetPostsQuery({ postId })
  const post = data?.posts?.[0]
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const { uploadPostPix, isUploading, imageUploadProgress } = useImageUpload()

  const deletePreviousPostPix = async (imageUrl) => {
    if (!imageUrl) return
    const imageRef = ref(storage, imageUrl)
    try {
      await deleteObject(imageRef)
    } catch (error) {
      console.error("Error deleting old image:", error)
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const imagesToDelete = post.images.filter(
        (img) => !values.images.includes(img),
      )
      await Promise.all(imagesToDelete.map(deletePreviousPostPix))

      const result = await updatePost({
        postId,
        userId: currentUser._id,
        ...values,
      }).unwrap()
      navigate(`/post/${result.slug}`)
      dispatch(
        addToast({ type: "success", message: "Post updated successfully" }),
      )
    } catch (error) {
      console.error("Update failed:", error)
      dispatch(
        addToast({
          type: "error",
          message: `Update failed: ${error.message || "Unknown error occurred"}`,
        }),
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  if (error) return <div>Error: {error.message}</div>

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Update post</h1>
      <Formik
        initialValues={post || INITIAL_POST_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex-1">
                <FormField type="text" name="title" placeholder="Title" />
              </div>
              <CategorySelect />
            </div>
            <ImageUploader
              files={files}
              setFiles={setFiles}
              uploadPostPix={uploadPostPix}
              isUploading={isUploading}
              imageUploadProgress={imageUploadProgress}
              setFieldValue={setFieldValue}
              existingImages={values.images || []}
            />
            <ErrorMessage
              name="images"
              component="div"
              className="text-red-500"
            />
            <TextContentEditor
              setFieldValue={setFieldValue}
              initialValue={post?.content}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500"
            />
            <SubmitButton
              isSubmitting={isSubmitting || isUpdating}
              submittingText="Updating..."
              defaultText="Update"
            />
          </Form>
        )}
      </Formik>
    </main>
  )
}
