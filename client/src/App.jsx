// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Layouts
import RootLayout from "./components/RootLayout/RootLayout"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Posts from "./pages/Posts"
import Post from "./pages/Post"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import Contact from "./pages/Contact"
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"

// Route Guards
import PrivateRouteAuth from "./components/PrivateRoute/PrivateRouteAuth"
import PrivateRouteAdmin from "./components/PrivateRoute/PrivateRouteAdmin"
import PrivateRouteNoAuth from "./components/PrivateRoute/PrivateRouteNoAuth"

const publicRoutes = [
  { index: true, element: <Home /> },
  { path: "posts", element: <Posts /> },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "post/:postSlug", element: <Post /> },
  { path: "about", element: <About /> },
]

const privateRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "contact", element: <Contact /> },
]

const adminRoutes = [
  { path: "create-post", element: <CreatePost /> },
  { path: "update-post/:postId", element: <UpdatePost /> },
]

const noAuthRoutes = [
  { path: "verify-email/:token?", element: <VerifyEmail /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password/:token", element: <ResetPassword /> },
]

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        ...publicRoutes,
        {
          element: <PrivateRouteAuth />,
          children: privateRoutes,
        },
        {
          element: <PrivateRouteAdmin />,
          children: adminRoutes,
        },
        {
          element: <PrivateRouteNoAuth />,
          children: noAuthRoutes,
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
