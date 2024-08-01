import { Field, ErrorMessage } from "formik"

const TextAreaField = ({ label, name, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-100"
      >
        {label}
      </label>
      <div className="relative">
        <Field
          as="textarea"
          id={name}
          name={name}
          {...props}
          className="mt-1 block w-full rounded-md border-zinc-300 bg-zinc-100 p-2 shadow-sm sm:text-sm dark:bg-zinc-700"
        />
        <span className="absolute bottom-2 right-2 text-xs text-zinc-400">
          character(s) left: {props.maxLength - (props.value?.length || 0)}
        </span>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  )
}

export default TextAreaField
