import "./NavBarPublic.css";
import { assets } from "../../../assets/assets";

const NavBarPublic = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <img
        className="w-30 h-16"
          src={assets.logo}
          alt="logo"
        />
      </div>
      <div>
        <ul className="flex flex-row gap-10">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
            <li>
                <a href="/contact">Contact Us</a>
            </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Sing Up</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarPublic;
