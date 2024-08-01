import React from "react"
import { Field, ErrorMessage } from "formik"
import { TextInput, Label } from "flowbite-react"

const FormField = ({ name, label, type = "text", placeholder }) => {
  return (
    <div>
      <Label htmlFor={name} value={label} />
      <Field type={type} name={name} placeholder={placeholder} as={TextInput} />
      <div className="mt-1 text-sm text-red-500">
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}

export default FormField
