import React from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import { AiOutlineCloudUpload } from "react-icons/ai"

const UploadButton = ({
  handleUpload,
  isUploading,
  imageUploadProgress,
  filesLength,
}) => {
  return (
    <button
      type="button"
      onClick={handleUpload}
      disabled={isUploading || filesLength === 0}
      className="flex h-10 max-w-44 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 px-4 py-2 font-bold text-zinc-100 hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-700 hover:to-orange-400 hover:text-zinc-100 disabled:opacity-50"
    >
      {isUploading ? (
        <div className="h-8 w-8">
          <CircularProgressbar
            value={imageUploadProgress}
            text={`${imageUploadProgress.toFixed(0)}%`}
          />
        </div>
      ) : (
        <>
          <AiOutlineCloudUpload className="h-6 w-6" />
          <span className="hidden md:inline">Upload Image</span>
        </>
      )}
    </button>
  )
}

export default UploadButton
