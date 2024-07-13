import "./SingleProperty.css";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getProperty } from "../../service/db-service";
import { useState, useEffect } from "react";

const SingleProperty = () => {
  const { id = "" } = useParams();
  const [property, setProperty] = useState(null);
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
        <div className="single_property_photos">
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
            <div onClick={()=>setShowAllPhotos(false)} className="flex justify-end mr-10 text-2xl mt-3 cursor-pointer"><p>X</p></div>
            <div className="single_property_all_photos">
              {photos.map((photo, index) => {
                return <img key={index} src={photo} alt="property" />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProperty;
