import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/FooterComponent"
import SetToTopPage from "../SetToTopPage/SetToTopPage"
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton"
import ToastContainer from "../Toast/ToastContainer"

const RootLayout = () => {
  return (
    <>
      <SetToTopPage />
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default RootLayout
