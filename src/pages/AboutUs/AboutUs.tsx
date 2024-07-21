import "./AboutUs.css";
import { assets } from "../../assets/assets";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";

const AboutUs = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return (
    <div className="mx-4">
      {user && <NavBar />}

      <div className="about_us_top">
        <h3>
          We're Here to Help You
          <br />
          To Fid Your Home
        </h3>
        <img src={assets.home_top} alt="" />
      </div>
    </div>
  );
};

export default AboutUs;
