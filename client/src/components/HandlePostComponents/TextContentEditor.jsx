import { Field } from "formik"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function TextContentEditor({
  setFieldValue,
  initialValue = "",
}) {
  return (
    <Field name="content">
      {({ field }) => (
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 h-72"
          value={field.value || initialValue}
          onChange={(value) => setFieldValue("content", value)}
        />
      )}
    </Field>
  )
}
