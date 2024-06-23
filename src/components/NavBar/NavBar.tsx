import "./NavBar.css";
import { useUserAuth } from "../../context/userAuthContext";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const { logOut, user } = useUserAuth();

  return (
    <div className="flex justify-between items-center mx-4 my-4">
      <div>
        <img src={assets.logo} alt="user" className="w-30 h-16" />
      </div>
      <div>
        <ul className="flex gap-20 text-lg">
          <li>
            <a href="/buy">Buy</a>
          </li>
          <li>
            <a href="/rent">Rent</a>
          </li>
          <li>
            <a href="/sell">Sell</a>
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
        <i className="fa-solid fa-chevron-down fa-lg relative"></i>
      </div>
      <div>
      <div className="options-menu">
          <button className="value">Public profile</button>
          <button className="value">Account</button>
          <button className="value">Appearance</button>
          <button className="value">Accessibility</button>
          <button className="value">Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
