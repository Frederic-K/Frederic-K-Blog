import AboutContent from "../components/AboutComponents/AboutContent"
import Logo from "../components/AboutComponents/Logo"

export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="mx-auto max-w-2xl p-3 text-center">
        <h1 className="font my-6 text-center text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          About {"Frederic-K's"} Blog
        </h1>
        <AboutContent />
        <Logo />
      </section>
    </main>
  )
}
