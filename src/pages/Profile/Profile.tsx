import "./Profile.css";
import { assets } from "../../assets/assets";
import { uploadUserPhoto, getUserPhoto } from "../../service/storage";
import { useRef, useEffect, useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import { getUser } from "../../service/db-service";

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="edit_btn">
    Edit<i className="fa-solid fa-pen pl-2 opacity-75"></i>
  </button>
);

const Profile = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>();
  const { user } = useUserAuth();
  const fileInput = useRef<HTMLInputElement>(null);
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      const userSnapshot = await getUser(user?.displayName ?? "");
      if (userSnapshot) {
        setUserDetails(userSnapshot.val());
      }
    };
    fetchUser();
  }, [user]);

  const photoUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateStorageUrl = async () => {
    if (photoUrl) {
      try {
        const file = await fetch(photoUrl).then(res => res.blob());
        await uploadUserPhoto(user?.email ?? "", file);
        console.log("File uploaded successfully.");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const handleImageClick = () => {
    fileInput.current?.click();
  };

  return (
    <div className="profile_container">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="profile_row flex justify-between items-center">
        <div className="flex items-center">
          <input
            onChange={(e) => photoUpdate(e)}
            type="file"
            style={{ display: "none" }}
            ref={fileInput}
            id="file"
          />
          <img
            onClick={handleImageClick}
            src={photoUrl ? photoUrl : assets.user}
            className="w-20 h-20 rounded-full"
            alt="User profile"
          />
          <div className="ml-4 flex flex-col">
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
            <input
              className="opacity-75"
              type="text"
              placeholder={
                userDetails?.address ? userDetails?.address : "Provide address"
              }
            />
          </div>
        </div>
        <EditButton onClick={updateStorageUrl}/>
      </div>
      <div className="profile_row flex flex-col gap-2">
        <h2 className="text-lg font-semibold pb-4">Personal Information</h2>
        <div className="flex gap-7">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="opacity-75">
              First Name
            </label>
            <input
              className="input"
              type="text"
              id="first_name"
              placeholder={
                userDetails?.first_name ? userDetails?.first_name : "......"
              }
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
              placeholder={
                userDetails?.last_name ? userDetails?.last_name : "......"
              }
            />
          </div>
        </div>
        <div className="flex gap-7">
          <div className="flex flex-col">
            <label htmlFor="email" className="opacity-75">
              Email
            </label>
            <p className="aw">{user?.email}</p>
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
                placeholder={userDetails?.phone ? userDetails?.phone : "......"}
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
            <input
              className="input"
              type="text"
              placeholder={
                userDetails?.country ? userDetails.country : "......"
              }
            />
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="city" className="opacity-75">
                City
              </label>
              <input
                className="input"
                type="text"
                placeholder={userDetails?.city ? userDetails.city : "......"}
              />
            </div>
          </div>
        </div>
        <EditButton />
      </div>
      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4 text-red-600">
          Delete Account
        </h2>
        <button className="delete_btn">Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
