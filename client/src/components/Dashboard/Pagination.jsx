import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePageCount = 5
  const halfVisible = Math.floor(visiblePageCount / 2)
  const showLeftEllipsis = currentPage > halfVisible + 1
  const showRightEllipsis = currentPage < totalPages - halfVisible

  return (
    <nav className="mt-2 flex min-w-[586px] items-center justify-between rounded-md bg-zinc-100 px-4 py-3 shadow-md sm:px-6 dark:bg-zinc-700">
      <div className="flex w-full items-center justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-300 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="text-sm text-zinc-700 dark:text-zinc-400">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-300 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-700 dark:text-zinc-400">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <ul className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <li className="group">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-300 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 group-hover:text-zinc-600"
                  aria-hidden="true"
                />
              </button>
            </li>
            {pageNumbers.map((number) => {
              if (
                number === 1 ||
                number === totalPages ||
                (number >= currentPage - halfVisible &&
                  number <= currentPage + halfVisible)
              ) {
                return (
                  <li key={number}>
                    <button
                      onClick={() => onPageChange(number)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        number === currentPage
                          ? "z-10 bg-orange-700/80 text-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700/80"
                          : "text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-300 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                )
              } else if (
                (showLeftEllipsis && number === 2) ||
                (showRightEllipsis && number === totalPages - 1)
              ) {
                return (
                  <li key={number} className="px-2 py-2">
                    ...
                  </li>
                )
              }
              return null
            })}
            <li className="group">
              <button
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-300 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 group-hover:text-zinc-600"
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
