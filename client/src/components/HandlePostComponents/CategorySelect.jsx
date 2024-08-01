import { Field, ErrorMessage } from "formik"
import { Select } from "flowbite-react"
import { CATEGORIES } from "../../utils/constants/categories"

export default function CategorySelect() {
  return (
    <>
      <Field as={Select} name="category">
        <option value="">Select a category</option>
        {CATEGORIES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Field>
      <ErrorMessage name="category" component="div" className="text-red-500" />
    </>
  )
}
