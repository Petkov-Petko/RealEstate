import "./Profile.css";
import { assets } from "../../assets/assets";

const EditButton: React.FC = () => (
  <button className="edit_btn">
    Edit<i className="fa-solid fa-pen pl-2 opacity-75"></i>
  </button>
);

const Profile = () => {
  return (
    <div className="profile_container">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="profile_row flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={assets.user}
            className="w-20 rounded-full"
            alt="User profile"
          />
          <div className="ml-4 flex flex-col">
            <h2 className="text-lg font-semibold">Petko Petkov</h2>
            <input
              className="opacity-75"
              type="text"
              placeholder="Varna, Bulgaria"
            />
          </div>
        </div>
        <EditButton />
      </div>
      <div className="profile_row flex flex-col gap-2">
        <h2 className="text-lg font-semibold pb-4">Personal Information</h2>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="opacity-75">
              First Name
            </label>
            <input
              className="input"
              type="text"
              id="first_name"
              placeholder="Petko"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="first_name" className="opacity-75">
              Last Name
            </label>
            <input
              className="input"
              type="text"
              id="last_name"
              placeholder="Petkov"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="email" className="opacity-75">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="waeaw@abv.bg"
            />
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="opacity-75">
                Phone
              </label>
              <input
                className="input"
                type="text"
                id="phone"
                placeholder="0888888888"
              />
            </div>
          </div>
        </div>
        <EditButton />
      </div>
      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4">Change Password</h2>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="password" className="opacity-75">
              Current Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="********"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="new_password" className="opacity-75">
              New Password
            </label>
            <input
              className="input"
              type="password"
              id="new_password"
              placeholder="********"
            />
          </div>
        </div>
        <EditButton />
      </div>
      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4">Address</h2>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="country" className="opacity-75">
              Country
            </label>
            <input className="input" type="text" placeholder="Bulgaria" />
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="city" className="opacity-75">
                City
              </label>
              <input className="input" type="text" placeholder="Varna" />
            </div>
          </div>
        </div>
        <EditButton />
      </div>
      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4 text-red-600">Delete Account</h2>
        <button className="delete_btn">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
