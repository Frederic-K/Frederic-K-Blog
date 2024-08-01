import { Link } from "react-router-dom"

export default function PostCard({ post }) {
  return (
    <div className="group relative h-80 w-full overflow-hidden rounded-lg border border-orange-500 shadow-md transition-all hover:border-2 hover:shadow-lg sm:w-80">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.images[0]}
          alt="Post image"
          className="z-20 h-56 w-full object-cover transition-all duration-300 group-hover:h-44"
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="line-clamp-1 text-lg font-semibold">{post.title}</p>
        <p className="text-sm italic">{post.category}</p>
        <Link
          to={`/post/${post.slug}`}
          className="absolute -bottom-80 left-0 right-0 z-10 m-2 rounded-md !rounded-tl-none !rounded-tr-none border border-orange-500 bg-zinc-300/50 py-2 text-center font-semibold text-orange-700 transition-all duration-300 hover:bg-gradient-to-t hover:from-orange-800 hover:to-orange-500 hover:text-zinc-200 group-hover:bottom-0 dark:text-zinc-200"
        >
          Read article
        </Link>
      </div>
    </div>
  )
}
