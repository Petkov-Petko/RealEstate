import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer>
      <div className="footer_top">
        <div className="footer_first_col">
          <img className="w-52 " src={assets.logo} alt="logo" />

          <div className="socials-container">
            <a href="https://x.com/" target="_blank" className="social twitter">
              <i className="fa-brands fa-x-twitter fa-lg"></i>
            </a>

            <a href="https://www.facebook.com/" target="_blank" className="social facebook">
              <i className="fa-brands fa-facebook-f fa-lg"></i>
            </a>

            <a href="https://www.instagram.com/" target="_blank" className="social instagram">
              <i className="fa-brands fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
        <div>
          <h2 className="pb-5">USEFUL LINKS</h2>
          <ul>
            <li>
              <a href="aboutUs">About Us</a>
            </li>
            <li>
              <a href="contacts">Contact Us</a>
            </li>
            <li>
              <a href="">Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div className="footer_third_col">
          <h2 className="pb-5">NEWSLETTER</h2>
          <p>Sign up for exclusive offers and news</p>
          <div className="input_wrapper">
            <input type="text" placeholder="Enter your email" />
            <i className="fa-solid fa-arrow-right fa-sm"></i>
          </div>
        </div>
      </div>
      <div className="footer_bottom flex justify-between">
        <div>
          <p>&copy; Estato 2024 All Rights Reserved</p>
        </div>
        <div>
          <ul  className="flex gap-4">
            <li>
              <a href="/properties">BUY</a>
            </li>
            <li>
              <a href="/properties">RENT</a>
            </li>
            <li>
              <a href="/properties">SAVED</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
