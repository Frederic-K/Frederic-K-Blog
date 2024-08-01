import { Table } from "flowbite-react"
import { FaCheck, FaTimes } from "react-icons/fa"

const UserTable = ({ users, handleDeleteClick }) => {
  const headers = [
    "Date created",
    "User image",
    "Username",
    "Email",
    "Admin",
    "Delete",
  ]

  const renderCell = (user, header) => {
    switch (header) {
      case "Date created":
        return new Date(user.createdAt).toLocaleDateString()
      case "User image":
        return (
          <img
            src={user.profilePicture}
            alt={user.username}
            className="h-10 w-10 rounded-full bg-zinc-500 object-cover"
          />
        )
      case "Username":
        return user.username
      case "Email":
        return user.email
      case "Admin":
        return user.isAdmin ? (
          <FaCheck className="text-green-500" />
        ) : (
          <FaTimes className="text-red-500" />
        )
      case "Delete":
        return (
          <span
            onClick={() => handleDeleteClick(user._id)}
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
    <Table hoverable className="rounded-xl shadow-md">
      <Table.Head>
        {headers.map((header, index) => (
          <Table.HeadCell key={index}>{header}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user) => (
          <Table.Row
            key={user._id}
            className="bg-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {headers.map((header, index) => (
              <Table.Cell key={index}>{renderCell(user, header)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default UserTable
