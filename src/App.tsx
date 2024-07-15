import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./context/userAuthContext";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
      <Footer />
    </UserAuthProvider>
  );
}

export default App;
