import "./SingleProperty.css";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getProperty } from "../../service/db-service";
import { useState, useEffect } from "react";
import { Property } from "../../types/types";

const SingleProperty = () => {
  const { id = "" } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [photos, setPhotos] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const snapshot = await getProperty(id);
        if (snapshot && snapshot.exists()) {
          setProperty(snapshot.val());
          setPhotos(snapshot.val().photos);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  return (
    <div>
      <NavBar />
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
              <i className="fa-regular fa-star fa-lg pr-3"></i>
              <i className="fa-regular fa-bookmark fa-lg"></i>
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
      </div>
    </div>
  );
};

export default SingleProperty;