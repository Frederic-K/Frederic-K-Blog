const UploadedImagePreview = ({ images, onRemove }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {images.map((img, index) => (
        <div key={index} className="group relative">
          <img
            src={img}
            alt={`Existing ${index}`}
            className="size-16 rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => onRemove(img)}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white opacity-0 shadow-md transition-opacity duration-300 hover:bg-red-600 group-hover:opacity-100"
            aria-label="Remove image"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default UploadedImagePreview
