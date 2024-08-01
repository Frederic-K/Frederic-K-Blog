import HeroCarousel from "../components/HomeComponents/HeroCarousel"
import Header from "../components/HomeComponents/Header"
import Description from "../components/HomeComponents/Description"
import ViewAllPostsLink from "../components/HomeComponents/ViewAllPostsLink"
import CategoryButtons from "../components/HomeComponents/CategoryButtons"
import CallToAction from "../components/CallToAction/CallToAction"
import RecentArticles from "../components/RecentArticles/RecentArticles"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-3 pb-12 pt-6">
        <HeroCarousel />
        <Header />
        <Description />
        <CategoryButtons />
      </section>
      <section className="mx-auto max-w-4xl bg-amber-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
      <section className="mx-auto max-w-6xl p-2">
        <RecentArticles limit={6} />
        <ViewAllPostsLink className="mb-5 justify-center" />
      </section>
    </main>
  )
}
