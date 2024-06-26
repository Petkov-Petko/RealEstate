import "./NavBarPublic.css";
import { assets } from "../../../assets/assets";

const NavBarPublic = () => {
  return (
    <div className="flex justify-between items-center mx-6 my-4">
      <div>
        <img
        className="w-30 h-16"
          src={assets.logo}
          alt="logo"
        />
      </div>
      <div className="public-li-el">
        <ul className="flex flex-row gap-10 text-lg">
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
