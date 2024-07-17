import "./NavBar.css";
import { useUserAuth } from "../../context/userAuthContext";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logOut, user } = useUserAuth();
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mx-5 my-4 nav_bar_container flex justify-between items-center">
      <div>
        <img src={assets.logo} alt="user" className="w-30 h-12" />
      </div>
      <div>
        <ul className="flex gap-20 text-lg">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/properties">Properties</a>
          </li>
          <li>
            <a href="/contacts">Contact</a>
          </li>
          <li>
            <a href="/aboutUs">About Us</a>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <i className="fa-regular fa-user fa-lg"></i>
        <p id="user_name">{user?.displayName}</p>
        <i
          onClick={() => setShowOptions(!showOptions)}
          className="fa-solid fa-chevron-down fa-lg cursor-pointer"
        ></i>
        <div>
          {showOptions && (
            <div className="options-menu">
              <button onClick={() => navigate("/home")} className="value mobile">Home</button>
              <button onClick={() => navigate("/properties")} className="value mobile">Properties</button>
              <button onClick={() => navigate("/contacts")} className="value mobile">Contacts</button>
              <button onClick={() => navigate("/aboutUs")} className="value mobile">About Us</button>
              <button className="value">Settings</button>
              <button onClick={() => navigate("/admin")} className="value">
                Admin
              </button>
              <button onClick={logOut} className="value">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
