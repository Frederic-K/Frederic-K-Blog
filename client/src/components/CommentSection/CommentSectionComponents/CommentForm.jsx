import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import CommentSubmitButton from "../CommentSubmitButton"

const CommentForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    comment: Yup.string()
      .required("Comment is required")
      .max(200, "Comment must be 200 characters or less"),
  })

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values.comment)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="mb-4">
          <Field
            as="textarea"
            name="comment"
            rows="4"
            className="w-full rounded-lg border p-2 dark:bg-zinc-600 dark:text-slate-300"
            placeholder="Write a comment..."
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
            <CommentSubmitButton isSubmitting={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CommentForm
