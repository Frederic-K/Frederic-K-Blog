import { Formik, Form, Field, ErrorMessage } from "formik"
import validationSchema from "../../../utils/validation/commentValidationSchema"
import CommentSubmitButton from "../CommentSubmitButton"
import CommentCancelButton from "./CommentCancelButton"

const EditCommentForm = ({ editedContent, handleSaveEdit, setIsEditing }) => {
  return (
    <Formik
      initialValues={{ comment: editedContent }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSaveEdit(values.comment)
        setIsEditing(false)
        setSubmitting(false)
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="mb-4">
          <Field
            as="textarea"
            name="comment"
            rows="4"
            className="w-full rounded-lg border p-2 dark:bg-zinc-600 dark:text-slate-300"
          />
          <ErrorMessage
            name="comment"
            component="div"
            className="mt-1 text-sm text-red-500"
          />
          <div className="flex justify-between">
            <p className="w-6xl text-xs text-gray-500">
              {200 - values.comment.length} characters remaining
            </p>
            <div
              className="flex
            gap-2"
            >
              <CommentSubmitButton isSubmitting={isSubmitting} />
              <CommentCancelButton setIsEditing={setIsEditing} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditCommentForm
