import { Link } from "react-router-dom"
import { CATEGORIES } from "../../utils/constants/categories"

export default function CategoryButtons() {
  return (
    <div className="mx-auto grid grid-cols-2 gap-4 md:mx-auto md:grid md:grid-cols-3 md:gap-x-16 md:gap-y-4 lg:flex lg:max-w-5xl lg:flex-wrap lg:gap-6">
      {CATEGORIES.map((category) => (
        <Link
          key={category.value}
          to={`/posts?searchTerm=&sort=desc&category=${category.value}`}
        >
          <button className="w-36 rounded-2xl border-2 border-orange-900 bg-zinc-100/50 p-1 font-semibold hover:bg-orange-500/50">
            {category.label}
          </button>
        </Link>
      ))}
    </div>
  )
}
