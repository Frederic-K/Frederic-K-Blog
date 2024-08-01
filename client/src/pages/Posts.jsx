import { useState } from "react"
import PostsList from "../components/PostsComponents/PostsList"
import FilterForm from "../components/PostsComponents/FilterForm"
import { BsFillFilterCircleFill } from "react-icons/bs"

export default function Posts() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <div className="w-full">
        <section className="relative flex min-h-[82px] flex-col justify-center border-b-2 border-zinc-400 p-4 lg:h-[82px] lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-3xl font-semibold">Posts :</h1>
          <button
            type="button"
            aria-label="Button to toggle filters"
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? "open peer" : "peer"} absolute right-6 top-7 flex items-center gap-2 font-semibold`}
          >
            <BsFillFilterCircleFill
              size={"25px"}
              className="text-zinc-600 transition-all hover:scale-105 hover:text-orange-800 "
            />
          </button>
          <FilterForm isOpen={isOpen} />
        </section>
        <section className="mx-auto max-w-5xl">
          <PostsList />
        </section>
      </div>
    </main>
  )
}
