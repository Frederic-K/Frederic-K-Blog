import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .test("confirmPassword", "Confirm Password is required", function (value) {
      return !this.parent.password || value
    }),
})

export default validationSchema
