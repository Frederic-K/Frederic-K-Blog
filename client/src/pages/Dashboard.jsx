import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import DashboardSidebar from "../components/Dashboard/SidebarSection/DashboardSidebar"
import DashboardProfile from "../components/Dashboard/ProfileSection/DashboardProfile"
import DashboardPosts from "../components/Dashboard/PostsSection/DashboardPosts"
import DashboardUsers from "../components/Dashboard/UsersSection/DashboardUsers"
import DashboardComments from "../components/Dashboard/CommentsSection/DashboardComments"
import DashboardOverviewSection from "../components/Dashboard/DashboardOverviewSection/DashboardOverviewSection"

const Dashboard = () => {
  const [tab, setTab] = useState("")
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const renderTabContent = () => {
    switch (tab) {
      case "profile":
        return <DashboardProfile />
      case "posts":
        return <DashboardPosts />
      case "users":
        return <DashboardUsers />
      case "comments":
        return <DashboardComments />
      case "dashboard":
        return <DashboardOverviewSection />
      default:
        return null
    }
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {renderTabContent()}
    </main>
  )
}

export default Dashboard
