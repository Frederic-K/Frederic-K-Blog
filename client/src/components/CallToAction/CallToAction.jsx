export default function CallToAction() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-br-3xl rounded-tl-3xl border border-orange-500 p-3 text-center sm:flex-row">
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-2xl font-semibold">
          Want to learn more about my Bio?
        </h2>
        <p className="my-2 text-zinc-600 dark:text-zinc-300">
          Checkout this resource with all infos about my profile
        </p>
        <button
          className="h-10 rounded-xl rounded-bl-none rounded-tr-none bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 font-bold text-zinc-800 hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-700 hover:to-orange-400 hover:text-zinc-200"
          onClick={() =>
            window.open("https://frederic-k-letsmeet.netlify.app/", "_blank")
          }
        >
          Lets Meet Project : bring CV to live!
        </button>
      </div>
      <div className="flex-1 p-7">
        <img
          src="/images/callToAction/MyCVAppCTA.webp"
          alt="Image link to my portfolio"
        />
      </div>
    </div>
  )
}
