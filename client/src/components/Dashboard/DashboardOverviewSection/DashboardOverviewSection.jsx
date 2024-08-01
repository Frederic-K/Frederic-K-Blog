// React
import { useEffect, useState } from "react"
// Redux
import { useSelector } from "react-redux"
// Router
import { Link } from "react-router-dom"
// Axios
import axios from "axios"
// Flowbite
import { Button, Table } from "flowbite-react"
// Incons
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi"
import SeeAllButton from "./SeeAllButton"
import StatCard from "./StatCard"
import TableComponent from "./Table"

export default function DashboardOverviewSection() {
  // Redux
  const { currentUser } = useSelector((state) => state.user)
  // States
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  //
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  //
  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)

  // Gab all Statistics
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("/api/user/getUsers?limit=5")
  //       const data = await response.json()
  //       if (response.ok) {
  //         setUsers(data.users)
  //         setTotalUsers(data.totalUsers)
  //         setLastMonthUsers(data.lastMonthUsers)
  //       }
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch("/api/post/getPosts?limit=5")
  //       const data = await response.json()
  //       if (response.ok) {
  //         setPosts(data.posts)
  //         setTotalPosts(data.totalPosts)
  //         setLastMonthPosts(data.lastMonthPosts)
  //       }
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch("/api/comment/getComments?limit=8")
  //       const data = await response.json()
  //       if (response.ok) {
  //         setComments(data.comments)
  //         setTotalComments(data.totalComments)
  //         setLastMonthComments(data.lastMonthComments)
  //       }
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   if (currentUser.isAdmin) {
  //     fetchUsers()
  //     fetchPosts()
  //     fetchComments()
  //   }
  // }, [currentUser])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser.isVerified || !currentUser.isAdmin) return

      try {
        const [usersResponse, postsResponse, commentsResponse] =
          await Promise.all([
            axios.get("/api/user/getUsers?limit=5"),
            axios.get("/api/post/getPosts?limit=5"),
            axios.get("/api/comment/getComments?limit=5"),
          ])

        const { users, totalUsers, lastMonthUsers } = usersResponse.data
        setUsers(users)
        setTotalUsers(totalUsers)
        setLastMonthUsers(lastMonthUsers)

        const { posts, totalPosts, lastMonthPosts } = postsResponse.data
        setPosts(posts)
        setTotalPosts(totalPosts)
        setLastMonthPosts(lastMonthPosts)

        const { comments, totalComments, lastMonthComments } =
          commentsResponse.data
        setComments(comments)
        setTotalComments(totalComments)
        setLastMonthComments(lastMonthComments)
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message)
      }
    }

    fetchData()
  }, [currentUser.isAdmin, currentUser.isVerified])

  return (
    <main className="m-h-screen mt-4 p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-9">
        <StatCard
          title="Posts"
          total={totalPosts}
          lastMonth={lastMonthPosts}
          Icon={HiDocumentText}
          bgIconColor="bg-lime-600"
        />
        <StatCard
          title="Comments"
          total={totalComments}
          lastMonth={lastMonthComments}
          Icon={HiAnnotation}
          bgIconColor="bg-indigo-600"
        />
        <StatCard
          title="Users"
          total={totalUsers}
          lastMonth={lastMonthUsers}
          Icon={HiOutlineUserGroup}
          bgIconColor="bg-orange-600"
        />
      </div>
      <div className="mx-auto flex min-h-screen flex-wrap justify-center gap-4 py-3">
        <div className="flex w-full flex-1 flex-col rounded-md p-2 shadow-md md:w-auto dark:bg-zinc-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent posts</h1>
            {/* <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button> */}
            <SeeAllButton text="See all" to={"/dashboard?tab=posts"} />
          </div>
          <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 h-full w-full table-auto overflow-x-scroll p-3 md:mx-auto">
            {/* For the posts table */}
            <TableComponent
              headers={["Date created", "Post image", "Post Title", "Category"]}
              data={posts}
              renderRow={(post) => (
                <>
                  <Table.Cell>{post.createdAt.slice(0, 10)}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={post.images[0]}
                      alt="user"
                      className="h-10 w-14 rounded-md bg-zinc-500"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-96">{post.title}</Table.Cell>
                  <Table.Cell className="w-5">{post.category}</Table.Cell>
                </>
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col rounded-md p-2 shadow-md md:w-auto dark:bg-zinc-800">
          <div className="flex w-full justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent comments</h1>
            {/* <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button> */}
            <SeeAllButton text="See all" to="/dashboard?tab=comments" />
          </div>
          <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 h-full w-full table-auto overflow-x-scroll p-3 md:mx-auto">
            {/* For the comments table */}
            <TableComponent
              headers={[
                "Date created",
                "Post title",
                "Comment content",
                "User email",
                "Likes",
              ]}
              data={comments}
              renderRow={(comment) => (
                <>
                  <Table.Cell>{comment.createdAt.slice(0, 10)}</Table.Cell>
                  <Table.Cell className="w-96">
                    <p className="line-clamp-2">{comment.postTitle}</p>
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    <p className="line-clamp-2">{comment.content}</p>
                  </Table.Cell>
                  <Table.Cell className="w-80">
                    <p className="line-clamp-1">{comment.userEmail}</p>
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </>
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col rounded-md p-2 shadow-md md:w-auto dark:bg-zinc-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent users</h1>
            {/* <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button> */}
            <SeeAllButton text="See all" to="/dashboard?tab=users" />
          </div>
          <div className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 h-full w-full table-auto overflow-x-scroll p-3 md:mx-auto">
            {/* For the users table */}
            <TableComponent
              headers={["User", "Username", "Email"]}
              data={users}
              renderRow={(user) => (
                <>
                  <Table.Cell className="flex items-center gap-4">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="h-10 w-10 rounded-full bg-zinc-500 object-cover"
                    />
                    {`${user.username}`}
                  </Table.Cell>
                  <Table.Cell className="w-96">{user.username}</Table.Cell>
                  <Table.Cell className="w-96">{user.email}</Table.Cell>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
