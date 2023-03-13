
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./screens/Login/login";
import { Providers } from "./providers/provider";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import { Account } from "./screens/Account/account";

const loggedRoutes = [
  {
    path: "/err",
    element: <div>Hello world!</div>,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: '/',
    Component: Login
  }
];

function App() {
  const { userLogged } = useContext(UserContext);
  console.log('TESTE', {userLogged})

  const router = createBrowserRouter([
    {
      path: "/err",
      element: <div>Hello world!</div>,
    },
    {
      path: "/account",
      Component: Account,
    },
    {
      path: '/',
      Component: Login
    },
    {
      path: '/login',
      Component: Login
    },
  ]);

  return (<>
    <Providers>
      <RouterProvider 
        router={router}
        fallbackElement={<div><span>Loading...</span></div>} />
    </Providers>
  </>)
}

export default App
