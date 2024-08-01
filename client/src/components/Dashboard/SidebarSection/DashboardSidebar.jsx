import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { handleSignout } from "../../../features/auth/AuthUtils/authUtils"
import { HiArrowSmRight } from "react-icons/hi"
import ProfileLink from "./ProfileLink"
import AdminLinks from "./AdminLinks"

export default function DashboardSidebar() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <section className="w-full border-b-2 border-zinc-400 md:min-h-screen md:w-56 md:border-r-2">
      <div className="flex flex-col gap-1 p-2">
        {currentUser && currentUser.isVerified && (
          <ProfileLink tab={tab} currentUser={currentUser} />
        )}
        {currentUser && currentUser.isVerified && currentUser.isAdmin && (
          <AdminLinks tab={tab} />
        )}
        <button
          type="button"
          onClick={() => handleSignout(dispatch)}
          className="flex w-full items-center gap-2 p-2 text-lg text-zinc-500 transition-all duration-300 hover:rounded-md hover:bg-zinc-200 hover:text-orange-600"
        >
          <HiArrowSmRight /> Sign Out
        </button>
      </div>
    </section>
  )
}
