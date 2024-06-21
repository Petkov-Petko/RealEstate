import "./TitlePublic.css";
import { assets } from "../../../assets/assets";

const TitlePublic = () => {
  return (
    <div>
      <div className="relative">
        <img className="home-img" src={assets.home} alt="home" />
      </div>
      <div className="text-inside">
        <p>
          Find your Best <span>Real Estate</span>
        </p>
        <button>Get Started</button>
      </div>
      <div className="text-inside-right">
        <div>
          <h2 className="text-3xl font-bold">3500+</h2>
          <p className="opacity-70 text-xl">Happy Customers</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="opacity-70 text-xl">Properties Sold</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">300+</h2>
          <p className="opacity-70 text-xl">Properties Now</p>
        </div>
      </div>
    </div>
  );
};

export default TitlePublic;
