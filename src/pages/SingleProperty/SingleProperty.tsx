import "./SingleProperty.css";
import { useParams } from "react-router-dom";
import { getProperty } from "../../service/db-service";
import { useState, useEffect } from "react";
import { Property, UserDetails } from "../../types/types";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { updateProperty } from "../../service/db-service";
import { useUserAuth } from "../../context/userAuthContext";
import { getUser, editUserDetails } from "../../service/db-service";

const SingleProperty = () => {
  const { id = "" } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [photos, setPhotos] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [addressCoordinates, setAddressCoordinates] = useState({
    lat: 43.2141,
    lng: 27.9147,
  });
  const { user } = useUserAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const snapshot = await getProperty(id);
        if (snapshot && snapshot.exists()) {
          setProperty(snapshot.val());
          setPhotos(snapshot.val().photos);
          setAddressCoordinates({
            lat: snapshot.val().lat,
            lng: snapshot.val().lng,
          });
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };
    
    const fetchUser = async () => {
      try {
        const snapshot = await getUser(user?.displayName ?? "");
        if (snapshot && snapshot.exists()) {
          setUserDetails(snapshot.val());
          console.log(snapshot.val());
          
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
    fetchProperty();
  }, [id, user]);

  const likeOrDislike = async () => {
    if (user && property) {
      const likes = Array.isArray(property.likes) ? property.likes : [];
      if (likes.includes(user?.displayName ?? "")) {
        const updatedLikes = likes.filter((like) => like !== user.displayName);
        await updateProperty(property.id, { ...property, likes: updatedLikes });
        setProperty({ ...property, likes: updatedLikes });
      } else {
        const updatedLikes = [...likes, user.displayName].filter(
          (like) => like !== null
        ) as string[];
        await updateProperty(property.id, { ...property, likes: updatedLikes });
        setProperty({ ...property, likes: updatedLikes });
      }
    }
  };

  const saveOrRemove = async () => {
    if (user && property) {
      const savedProperties = userDetails?.savedProperties ?? {};
      const updatedSavedProperties = { ...savedProperties };
  
      if (savedProperties[property.id]) {
        delete updatedSavedProperties[property.id];
      } else {
        updatedSavedProperties[property.id] = true;
      }
  
      await editUserDetails(user.displayName ?? "", {
        savedProperties: updatedSavedProperties,
      });
  
      setUserDetails({
        ...userDetails,
        savedProperties: updatedSavedProperties,
      });
    }
  };

  return (
    <div>
      <div className="single_property">
        <div className="flex gap-3 mt-3 items-center justify-center">
          <div className="left_photo">
            <img src={photos[0]} alt="property" />
          </div>
          <div className="right_photos relative">
            <img src={photos[1]} alt="property" />
            <img src={photos[2]} alt="property" />
            <img className="opacity-80" src={photos[3]} alt="property" />
            <div className="single_property_more_photos">
              <p onClick={() => setShowAllPhotos(true)}>+{photos.length - 4}</p>
            </div>
          </div>
        </div>
        <div>
          {showAllPhotos && (
            <div className="single_property_all_photos_container">
              <div
                onClick={() => setShowAllPhotos(false)}
                className="flex justify-end mr-10 text-2xl mt-3 cursor-pointer"
              >
                <p>X</p>
              </div>
              <div className="single_property_all_photos">
                {photos.map((photo, index) => {
                  return <img key={index} src={photo} alt="property" />;
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-3 gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">{property?.name}</h1>
            <p className="text-2xl">
              <span id="single_property_price">${property?.price}</span>
              <span className="opacity-60">
                {" "}
                {property?.deal === "rent" ? "/ month" : "/ buy"}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>
              <i className="fa-solid fa-location-dot fa-lg pr-1"></i>
              {property?.street}, {property?.city}
            </p>
            <div>
              {property?.likes?.includes(user?.displayName ?? "") ? (
                <i
                  onClick={likeOrDislike}
                  className="fa-solid fa-heart fa-lg pr-3 cursor-pointer"
                  style={{ color: "#e71818" }}
                ></i>
              ) : (
                <i
                  onClick={likeOrDislike}
                  className="fa-regular fa-heart fa-lg pr-3 cursor-pointer"
                ></i>
              )}
              {userDetails?.savedProperties?.[property?.id ?? ""] ? (
                <i
                  onClick={saveOrRemove}
                  className="fa-solid fa-bookmark fa-lg"
                ></i>
              ) : (
                <i
                  onClick={saveOrRemove}
                  className="fa-regular fa-bookmark fa-lg"
                ></i>
              )}
            </div>
          </div>
          <div>
            <ul className="flex gap-7 align-middle justify-center single_property_ul">
              <li>
                <i className="fa-solid fa-expand fa-lg pr-1"></i>
                {property?.square}m2
              </li>
              <li>
                <i className="fa-solid fa-door-open fa-lg pr-1"></i>
                {property?.rooms} Rooms
              </li>
              <li>
                <i className="fa-solid fa-bath fa-lg pr-1"></i>
                {property?.baths} Baths
              </li>
              <li>
                <i className="fa-solid fa-building fa-lg pr-1"></i>
                {property?.type}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-2xl  pb-2">Properties details</p>
            <p className="opacity-80 text-lg">{property?.description}</p>
          </div>
        </div>
        <div>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY}>
            <div className="rounded-3xl overflow-hidden pt-5">
              <div className="w-[100%] h-[500px]">
                <Map
                  defaultZoom={15}
                  center={addressCoordinates}
                  defaultCenter={addressCoordinates}
                  mapId={import.meta.env.VITE_GOOGLE_ID}
                >
                  <AdvancedMarker
                    position={addressCoordinates}
                  ></AdvancedMarker>
                </Map>
              </div>
            </div>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
