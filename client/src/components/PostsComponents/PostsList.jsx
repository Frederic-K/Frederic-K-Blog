import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useLazyGetPostsQuery } from "../../services/slices/postApi"
import { addToast } from "../../services/slices/toastSlice"
import PostCard from "../PostCard/PostCard"
import { Spinner } from "flowbite-react"
import { useInView } from "react-intersection-observer"
import { useLocation } from "react-router-dom"
import { getInitialFilterValues } from "../../utils/helpers/urlHelpers"

const POSTS_PER_PAGE = 9
const SCROLL_THRESHOLD = 100

export default function PostsList() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState([])
  const [hasScrolled, setHasScrolled] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px",
    triggerOnce: false,
  })

  const filterParams = getInitialFilterValues(location.search)
  const prevFilterParamsRef = useRef()

  const [getPosts, { data: postsData, isLoading, isFetching, error }] =
    useLazyGetPostsQuery()

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > SCROLL_THRESHOLD && setHasScrolled(true)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const filterParamsChanged =
      JSON.stringify(filterParams) !==
      JSON.stringify(prevFilterParamsRef.current)
    if (filterParamsChanged) {
      resetPostsAndFetch()
    }
  }, [filterParams])

  useEffect(() => {
    if (postsData?.posts && !isFetching) {
      setAllPosts((prev) =>
        page === 1 ? postsData.posts : [...prev, ...postsData.posts],
      )
    }
  }, [postsData, isFetching, page])

  useEffect(() => {
    if (shouldFetchNextPage()) {
      fetchNextPage()
    }
  }, [
    inView,
    isFetching,
    postsData?.hasMore,
    allPosts.length,
    page,
    hasScrolled,
  ])

  const resetPostsAndFetch = () => {
    setPage(1)
    setAllPosts([])
    prevFilterParamsRef.current = { ...filterParams }
    getPosts({ page: 1, limit: POSTS_PER_PAGE, ...filterParams })
  }

  const shouldFetchNextPage = () =>
    inView &&
    !isFetching &&
    postsData?.hasMore &&
    allPosts.length > 0 &&
    (page > 1 || hasScrolled)

  const fetchNextPage = () => {
    const nextPage = page + 1
    setPage(nextPage)
    getPosts({ page: nextPage, limit: POSTS_PER_PAGE, ...filterParams })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  }

  if (error) {
    dispatch(addToast({ type: "error", message: error.message }))
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="mt-5 flex flex-wrap justify-center gap-4 p-3">
      {allPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {isFetching && (
        <div className="mt-5 flex w-full justify-center">
          <Spinner size="xl" />
        </div>
      )}
      {!isFetching && postsData?.hasMore && (
        <div ref={ref} style={{ height: "1px", width: "100%" }} />
      )}
    </div>
  )
}
