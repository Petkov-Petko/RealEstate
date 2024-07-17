import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer>
      <div className="footer_top">
        <div className="footer_first_col">
          <img className="w-52 " src={assets.logo} alt="logo" />

          <div className="socials-container">
            <a href="#" className="social twitter">
              <i className="fa-brands fa-x-twitter fa-lg"></i>
            </a>

            <a href="#" className="social facebook">
              <i className="fa-brands fa-facebook-f fa-lg"></i>
            </a>

            <a href="#" className="social instagram">
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
              <a href="terms">Terms and Conditions</a>
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
    </footer>
  );
};

export default Footer;
