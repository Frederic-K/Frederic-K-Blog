import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  content: Yup.string().required("Content is required"),
  images: Yup.array().min(1, "At least one image is required"),
})

export default validationSchema
