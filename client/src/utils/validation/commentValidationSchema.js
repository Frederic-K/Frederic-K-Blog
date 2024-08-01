import * as Yup from "yup"

const validationSchema = Yup.object({
  comment: Yup.string()
    .required("Comment is required")
    .max(200, "Comment must be 200 characters or less"),
})

export default validationSchema
