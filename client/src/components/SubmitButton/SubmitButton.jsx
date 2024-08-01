import { Spinner } from "flowbite-react"

const SubmitButton = ({ isSubmitting, submittingText, defaultText }) => {
  return (
    <button
      type="submit"
      className="h-10 w-full rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 font-bold text-zinc-100 hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-700 hover:to-orange-400 hover:text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">{submittingText}</span>
        </>
      ) : (
        defaultText
      )}
    </button>
  )
}

export default SubmitButton
