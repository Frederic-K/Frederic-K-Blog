function SubmitButton() {
  return (
    <div className="mx-auto w-full rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 p-[2px] lg:w-28">
      <button
        type="submit"
        className="h-10 w-full rounded-lg bg-zinc-100 font-semibold text-zinc-800 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default SubmitButton
