import { Table } from "flowbite-react"
import { Link } from "react-router-dom"

const PostsTable = ({ posts, onDelete }) => {
  const headers = [
    "Date updated",
    "Post image",
    "Post title",
    "Category",
    "Delete",
    "Edit",
  ]

  const renderCell = (post, header) => {
    switch (header) {
      case "Date updated":
        return new Date(post.updatedAt).toLocaleDateString()
      case "Post image":
        return (
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.images[0]}
              alt={post.title}
              className="h-10 w-20 bg-zinc-500 object-cover"
            />
          </Link>
        )
      case "Post title":
        return (
          <Link
            className="font-medium text-zinc-800 dark:text-zinc-200"
            to={`/post/${post.slug}`}
          >
            {post.title}
          </Link>
        )
      case "Category":
        return post.category
      case "Delete":
        return (
          <span
            onClick={() => onDelete(post._id)}
            className="cursor-pointer font-medium text-red-500 hover:underline"
          >
            Delete
          </span>
        )
      case "Edit":
        return (
          <Link
            className="text-teal-500 hover:underline"
            to={`/update-post/${post._id}`}
          >
            <span>Edit</span>
          </Link>
        )
      default:
        return null
    }
  }

  return (
    <Table hoverable className="rounded-xl shadow-md">
      <Table.Head>
        {headers.map((header, index) => (
          <Table.HeadCell key={index}>{header}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {posts.map((post) => (
          <Table.Row
            key={post._id}
            className="bg-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {headers.map((header, index) => (
              <Table.Cell key={index}>{renderCell(post, header)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default PostsTable
