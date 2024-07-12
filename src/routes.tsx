import { createBrowserRouter } from "react-router-dom";
import PublicView from "./pages/PublicView/PublicView";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Admin from "./pages/Admin/Admin";

import Properties from "./pages/Properties/Properties";
import Contacts from "./pages/Contacts/Contacts";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/contacts",
        element: <Contacts />,
        errorElement: <Error />,
      },
      {
        path: "/home",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/properties",
        element: <Properties />,
        errorElement: <Error />,
      },
      {
        path: "/admin",
        element: <Admin />,
        errorElement: <Error />,
      }
    ],
  },
  {
    path: "/",
    element: <PublicView />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

export default router;
