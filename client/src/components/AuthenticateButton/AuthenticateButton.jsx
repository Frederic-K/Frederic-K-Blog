import { Spinner } from "flowbite-react"

const AuthenticateButton = ({ isSubmitting, text }) => (
  <div className="mx-auto w-full rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 p-[2px]">
    <button
      type="submit"
      disabled={isSubmitting}
      className="h-10 w-full rounded-lg bg-zinc-100 font-semibold text-zinc-800 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200"
    >
      {isSubmitting ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">Submitting...</span>
        </>
      ) : (
        text
      )}
    </button>
  </div>
)

export default AuthenticateButton
