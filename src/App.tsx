import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Reports from "./pages/Reports"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "reports", element: <Reports /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
