import { useUserAuth } from "../../context/userAuthContext";

const NavBar = () => {
  const { logOut, user} = useUserAuth();
  
  return (
    <div>
      <button
        onClick={() => {
          logOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default NavBar;
