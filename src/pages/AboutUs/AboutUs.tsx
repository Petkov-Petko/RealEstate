import "./AboutUs.css";
import { assets } from "../../assets/assets";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";

const AboutUs = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return (
    <div>
      {user && <NavBar />}
      <div className="about_us_container">
        <div className="about_us_top">
          <h3>
            We're Here to Help You
            <br />
            To Fid Your Home
          </h3>
          <img src={assets.home_top} alt="" />
        </div>
        <div className="about_us_middle">
          <img className="w-96 h-96 float-left" src={assets.home_top}></img>
          <div className="flex flex-col gap-5 pl-4">
            <h3 className="text-4xl">
              Our Reputation Is As Real As <br />
              Our Properties
            </h3>
            <p className="w-70 opacity-75">
              We are professionals real estate agent, you will feel premium
              service from us.
            </p>
            <table>
              <tr>
                <th className="text-4xl">950+</th>
                <th className="text-4xl">342</th>
                <th className="text-4xl">12</th>
              </tr>
              <tr>
                <td className="text-sm text-center opacity-75">
                  Happy Customers
                </td>
                <td className="text-sm text-center opacity-75">
                  RealEstate Partners
                </td>
                <td className="text-sm text-center opacity-75">
                  Years Experience
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="about_us_bottom">
          <h3>What Our Customer Say About Us</h3>
          <div>
            <div>
              <p>Amazing service, worth the money. They help me to sell my </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
