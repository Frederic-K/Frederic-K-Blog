import * as yup from "yup"

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must match")
    .required("Confirm email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
})

export default validationSchema
