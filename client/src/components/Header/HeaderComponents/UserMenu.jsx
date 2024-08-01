import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Dropdown, Avatar } from "flowbite-react"
import { handleSignout } from "../../../features/auth/AuthUtils/authUtils"
import AdminLinks from "../HeaderComponents/AdminLinks"

const UserMenu = ({ tab }) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt="user avatar" img={currentUser.profilePicture} rounded />
      }
      className="z-30"
    >
      <Dropdown.Header>
        <span className="block text-sm">@{currentUser.username}</span>
        <span className="block truncate text-sm font-medium">
          {currentUser.email}
        </span>
      </Dropdown.Header>
      <Link to={"/dashboard?tab=profile"}>
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      {currentUser && currentUser.isVerified && currentUser.isAdmin && (
        <AdminLinks tab={tab} />
      )}
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleSignout(dispatch)}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}

export default UserMenu
