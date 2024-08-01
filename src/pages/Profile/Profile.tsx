import "./Profile.css";
import { assets } from "../../assets/assets";
import { uploadUserPhoto, getUserPhoto } from "../../service/storage";
import { useRef, useEffect, useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import {
  editCredential,
  editUserDetails,
  getUser,
} from "../../service/db-service";
import { UserDetails } from "../../types/types";
import { handleUserDelete } from "../../service/auth";

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="edit_btn">
    Edit<i className="fa-solid fa-pen pl-2 opacity-75"></i>
  </button>
);

const Profile = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>();
  const { user } = useUserAuth();
  const fileInput = useRef<HTMLInputElement>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    photo: "",
    username: "",
  });
  const [image_changed_message, setImageChangedMessage] = useState<string>("");
  const [user_details_message, setUserDetailsMessage] = useState<string>("");
  const [delete_message, setDeleteMessage] = useState<boolean>(false);

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
        const file = await fetch(photoUrl).then((res) => res.blob());
        const fileToUpload = new File([file], "photo.jpg", { type: file.type });
        await uploadUserPhoto(user?.email ?? "", fileToUpload);
        console.log("File uploaded successfully.");
        const url = await getUserPhoto(user?.email ?? "");
        await editCredential(user?.displayName ?? "", "photo", url);
        setImageChangedMessage("Image changed successfully.");
      } catch (error) {
        console.error("Error uploading file:", error);
        setImageChangedMessage("Error changing image.");
      }
    }
  };
  const handleImageClick = () => {
    fileInput.current?.click();
  };

  const updateUserInfo = async () => {
    if (!/^[0-9]+$/.test(userDetails.phone)) {
      setUserDetailsMessage("Phone number should not contain letters.");
      return;
    } else if (userDetails.phone.length !== 10) {
      setUserDetailsMessage("Phone number should be 10 digits.");
      return;
    }
    await editUserDetails(user?.displayName ?? "", userDetails);
    setUserDetailsMessage("Profile updated successfully.");
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
            src={
              photoUrl
                ? photoUrl
                : userDetails?.photo
                ? userDetails.photo
                : assets.user
            }
            className="w-20 h-20 rounded-full"
            alt="User profile"
          />
          <div className="ml-4 flex flex-col">
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
          </div>
        </div>
        <EditButton onClick={updateStorageUrl} />
      </div>
      {image_changed_message !== "" && (
        <p className="text-lg font-semibold pl-3">{image_changed_message}</p>
      )}
      <div className="profile_row flex flex-col gap-2">
        <h2 className="text-lg font-semibold pb-4">Personal Information</h2>
        <div className="flex gap-7">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="opacity-75">
              First Name
            </label>
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, first_name: e.target.value })
              }
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
              onChange={(e) =>
                setUserDetails({ ...userDetails, last_name: e.target.value })
              }
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
            <p className="w-[174px] text-ellipsis overflow-hidden whitespace-nowrap">
              {user?.email}
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="opacity-75">
                Phone
              </label>
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                className="input"
                type="text"
                id="phone"
                placeholder={userDetails?.phone ? userDetails?.phone : "......"}
              />
            </div>
          </div>
        </div>
        <EditButton onClick={updateUserInfo} />
      </div>

      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4">Address</h2>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="country" className="opacity-75">
              Country
            </label>
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, country: e.target.value })
              }
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
                onChange={(e) =>
                  setUserDetails({ ...userDetails, city: e.target.value })
                }
                className="input"
                type="text"
                placeholder={userDetails?.city ? userDetails.city : "......"}
              />
            </div>
          </div>
        </div>
        <EditButton onClick={updateUserInfo} />
      </div>
      <div className="profile_row">
        <h2 className="text-lg font-semibold pb-4 text-red-600">
          Delete Account
        </h2>
        <button
          onClick={() => setDeleteMessage(!delete_message)}
          className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
        >
          <i className="fa-solid fa-trash-can pr-1"></i>
          Delete
        </button>
        {delete_message && (
          <div className="mt-4">
            <p className="mb-2">Are you sure you want to delete your profile?</p>
            <button onClick={handleUserDelete} className="mr-3 inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">Yes</button>
            <button onClick={()=>setDeleteMessage(false)} className="inline-flex items-center px-4 py-2 bg-black transition ease-in-out delay-75 hover:bg-black text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">No</button>
          </div>
        )}
      </div>
      {user_details_message !== "" && (
        <p className="text-lg font-semibold pl-3">{user_details_message}</p>
      )}
    </div>
  );
};

export default Profile;
