import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, ErrorMessage } from "formik"

import { addToast } from "../services/slices/toastSlice"
import { useCreatePostMutation } from "../services/slices/postApi"
import { useImageUpload } from "../utils/hooks/useImageUpload"
import validationSchema from "../utils/validation/postValidationSchema"
import FormField from "../components/FormField/FormField"
import CategorySelect from "../components/HandlePostComponents/CategorySelect"
import TextContentEditor from "../components/HandlePostComponents/TextContentEditor"
import SubmitButton from "../components/SubmitButton/SubmitButton"
import ImageUploader from "../components/ImageUploader/ImageUploader"

const INITIAL_VALUES = { title: "", category: "", content: "", images: [] }

export default function CreatePost() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const { uploadPostPix, isUploading, imageUploadProgress } = useImageUpload()
  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await createPost(values).unwrap()
      navigate(`/post/${response.slug}`)
      dispatch(
        addToast({ message: "Post created successfully", type: "success" }),
      )
    } catch (error) {
      console.error("Error submitting post:", error)
      dispatch(
        addToast({
          message: `Failed to create post: ${error.message}`,
          type: "error",
        }),
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Create a post</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              existingImages={values.images}
            />
            <TextContentEditor setFieldValue={setFieldValue} />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500"
            />
            <SubmitButton
              isSubmitting={isSubmitting || isLoading}
              submittingText="Publishing..."
              defaultText="Publish"
            />
          </Form>
        )}
      </Formik>
    </main>
  )
}
