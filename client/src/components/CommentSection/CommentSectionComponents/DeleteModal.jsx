import { Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function DeleteModal({
  openModal,
  setOpenModal,
  handleDelete,
  commentToDelete,
}) {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} popup size="md">
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this comment?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => handleDelete(commentToDelete._id)}
            >
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
