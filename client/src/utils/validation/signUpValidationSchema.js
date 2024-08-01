import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  username: Yup.string().when("$isFieldTouched", (isFieldTouched, schema) =>
    isFieldTouched
      ? schema
          .min(3, "Username must be at least 3 characters")
          .required("Username is required")
      : schema,
  ),
  password: Yup.string().when("$isFieldTouched", (isFieldTouched, schema) =>
    isFieldTouched
      ? schema.min(6, "Password must be at least 6 characters")
      : schema,
  ),
})

export default validationSchema
