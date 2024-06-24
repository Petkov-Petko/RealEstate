import "./NavBar.css";
import { useUserAuth } from "../../context/userAuthContext";
import { assets } from "../../assets/assets";
import { useState } from "react";

const NavBar = () => {
  const { logOut, user } = useUserAuth();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex justify-between items-center mx-4 my-4">
      <div>
        <img src={assets.logo} alt="user" className="w-30 h-16" />
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
            <a href="/sell">Contact</a>
          </li>
        </ul>
      </div>
      <div className="group">
        <i className="fa-solid fa-magnifying-glass fa-lg icon"></i>
        <input placeholder="Search" type="search" className="input-search" />
      </div>
      <div className="flex items-center gap-4">
        <img className="w-20 h-16 rounded-full" src={assets.logo}></img>
        <p>{user?.displayName}</p>
        <i
          onClick={() => setShowOptions(!showOptions)}
          className="fa-solid fa-chevron-down fa-lg relative"
        ></i>
      </div>
      <div>
        {showOptions && (
          <div className="options-menu">
            <button className="value">Public profile</button>
            <button className="value">Account</button>
            <button className="value">Appearance</button>
            <button className="value">Accessibility</button>
            <button onClick={logOut} className="value">Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
