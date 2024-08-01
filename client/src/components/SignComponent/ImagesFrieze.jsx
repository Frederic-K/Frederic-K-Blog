import { useGetPostsQuery } from "../../services/slices/postApi"
import DefaultPix from "../../assets/defaultPix/DefaultPix.webp"

const ImagesFrieze = () => {
  const {
    data: postsData,
    isLoading,
    error,
  } = useGetPostsQuery({ limit: 7, sort: "desc" })

  const renderImage = (index, position, size, zIndex = "") => (
    <img
      src={postsData?.posts[index]?.images[0] || DefaultPix}
      alt={postsData?.posts[index]?.title || "Default Pix"}
      className={`
        animate-fadeIn absolute top-1/2 -translate-y-1/2 rounded-full border-2 border-orange-900 object-cover opacity-0 dark:border-orange-400
        ${position} w-${size} h-${size} ${zIndex}
        ${["animation-delay-500", "animation-delay-700", "animation-delay-700", "animation-delay-900", "animation-delay-900", "animation-delay-1000", "animation-delay-1000"][index]}
    `}
    />
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error... try refreshing the page</div>

  return (
    <section className="relative flex items-center justify-center">
      {postsData && (
        <div className="relative h-12 w-full">
          {renderImage(5, "left-[23%]", 6)}
          {renderImage(3, "left-[28%]", 8, "z-10")}
          {renderImage(1, "left-[35%]", 10, "z-20")}
          {renderImage(0, "left-1/2 -translate-x-1/2", 12, "z-30")}
          {renderImage(2, "right-[35%]", 10, "z-20")}
          {renderImage(4, "right-[28%]", 8, "z-10")}
          {renderImage(6, "right-[23%]", 6)}
        </div>
      )}
    </section>
  )
}

export default ImagesFrieze
