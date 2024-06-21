import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";

function App() {
  return(
  <UserAuthProvider>
    <RouterProvider router={router} />
  </UserAuthProvider>
  );
}

export default App;
