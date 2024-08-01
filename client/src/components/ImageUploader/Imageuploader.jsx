import { FileInput } from "flowbite-react"
import UploadButton from "./UploadButton"
import UploadedImagePreview from "./UploadedImagePreview"

const ImageUploader = ({
  files,
  setFiles,
  uploadPostPix,
  isUploading,
  imageUploadProgress,
  setFieldValue,
  existingImages,
}) => {
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
  }

  const handleUpload = async () => {
    const uploadedUrls = await uploadPostPix(files, setFieldValue)
    if (uploadedUrls) {
      setFieldValue("images", [...existingImages, ...uploadedUrls])
    }
    setFiles([])
  }

  const handleRemoveExisting = (imageUrl) => {
    setFieldValue(
      "images",
      existingImages.filter((img) => img !== imageUrl),
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4 rounded-3xl border-2 border-orange-300 p-3">
        <FileInput
          type="file"
          accept="image/*"
          multiple
          className="w-96 rounded-md border-gray-300 p-2"
          onChange={handleFileChange}
        />
        <UploadButton
          handleUpload={handleUpload}
          isUploading={isUploading}
          imageUploadProgress={imageUploadProgress}
          filesLength={files.length}
        />
      </div>

      <UploadedImagePreview
        images={existingImages}
        onRemove={handleRemoveExisting}
      />
    </section>
  )
}

export default ImageUploader
