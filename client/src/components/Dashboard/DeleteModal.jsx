import { Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function DeleteModal({ show, type, onClose, onDelete }) {
  return (
    <Modal show={show} onClose={onClose} popup size="md">
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-zinc-400 dark:text-zinc-200" />
          <h3 className="mb-5 text-lg text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete this {type}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onDelete}>
              Yes, I'm sure
            </Button>
            <Button color="zinc" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
