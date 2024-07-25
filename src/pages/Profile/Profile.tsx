import "./Profile.css";
import { assets } from "../../assets/assets";

const Profile = () => {
  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <img src={assets.user} className="w-20 rounded-full"></img>
        <input type="file" />
      </div>
    </div>
  );
};

export default Profile;
