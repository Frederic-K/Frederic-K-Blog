import { Table } from "flowbite-react"

const CommentTable = ({ comments, onDeleteClick }) => {
  const headers = [
    "Date updated",
    "Comment content",
    "Number of likes",
    "Post title",
    "User",
    "Delete",
  ]

  const renderCell = (comment, header) => {
    switch (header) {
      case "Date updated":
        return new Date(comment.updatedAt).toLocaleDateString()
      case "Comment content":
        return comment.content
      case "Number of likes":
        return comment.numberOfLikes
      case "Post title":
        return comment.postTitle
      case "User":
        return comment.userEmail
      case "Delete":
        return (
          <span
            onClick={() => onDeleteClick(comment._id)}
            className="cursor-pointer font-medium text-red-500 hover:underline"
          >
            Delete
          </span>
        )
      default:
        return null
    }
  }

  return (
    <Table hoverable className="mt-4 rounded-xl shadow-md">
      <Table.Head>
        {headers.map((header, index) => (
          <Table.HeadCell key={index}>{header}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {comments.map((comment) => (
          <Table.Row
            key={comment._id}
            className="bg-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {headers.map((header, index) => (
              <Table.Cell key={index}>{renderCell(comment, header)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CommentTable
