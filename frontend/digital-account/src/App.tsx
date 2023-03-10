
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./screens/Login/login";


const router = createBrowserRouter([
  {
    path: "/err",
    element: <div>Hello world!</div>,
  },
  {
    path: '/',
    Component: Login
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
