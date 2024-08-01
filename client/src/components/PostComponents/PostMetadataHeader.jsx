import { Link } from "react-router-dom"
import { Button } from "flowbite-react"

export default function PostMetadataHeader({ post }) {
  return (
    <>
      <h1 className="mx-auto max-w-2xl p-3 text-center text-3xl font-medium lg:mt-10 lg:text-4xl">
        {post.title}
      </h1>
      <Link
        to={`/posts?searchTerm=&sort=desc&category=${post.category}`}
        className="mb-2 self-center"
      >
        <Button color="zinc" pill size="sm" className="hover:bg-orange-500/50">
          {post.category}
        </Button>
      </Link>
    </>
  )
}
