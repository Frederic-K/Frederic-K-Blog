import { useState } from "react"
import { Field, ErrorMessage } from "formik"
import { TextInput, Label } from "flowbite-react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

const PasswordField = ({ name, label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <Label htmlFor={name} value={label} />
      <div className="relative">
        <Field
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          as={TextInput}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      <div className="mt-1 text-sm text-red-500">
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}

export default PasswordField
