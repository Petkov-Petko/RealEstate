import "./HomeContent.css";
import { assets } from "../../assets/assets";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";
import PropertyStyle from "../Property/Property";
import { useNavigate } from "react-router-dom";

const HomeContent = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [popularProperty, setPopularProperty] = useState<Property | null>(null);
  const [popularPropertyPhoto, setPopularPropertyPhoto] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesFromDb = await getAllProperties();
        if (propertiesFromDb) {
          const propertiesList: Property[] = [];
          propertiesFromDb.forEach((snapshot) => {
            const property = snapshot.val();
            propertiesList.push(property);
          });
          propertiesList.sort((a, b) => {
            const likesA = a.likes?.length ?? 0;
            const likesB = b.likes?.length ?? 0;
            return likesB - likesA;
          });
          setProperties(propertiesList);
          
          const popularProperty = propertiesList.find((property) => {
            return property.likes?.length === Math.max(...propertiesList.map((p) => p.likes?.length ?? 0));
          });
          setPopularProperty(popularProperty??null);
          setPopularPropertyPhoto(popularProperty?.photos[0] ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const nextPhoto = () => {
    const currentPhotoIndex = popularProperty?.photos.indexOf(
      popularPropertyPhoto ?? ""
    );
    let nextPhotoIndex;
    if (
      popularProperty &&
      currentPhotoIndex === popularProperty?.photos.length - 1
    ) {
      nextPhotoIndex = 0;
    } else {
      nextPhotoIndex = currentPhotoIndex ? currentPhotoIndex + 1 : 1;
    }
    setPopularPropertyPhoto(popularProperty?.photos[nextPhotoIndex] ?? null);
  };

  const prevPhoto = () => {
    const currentPhotoIndex = popularProperty?.photos.indexOf(
      popularPropertyPhoto ?? ""
    );
    let prevPhotoIndex;
    if (currentPhotoIndex === 0) {
      prevPhotoIndex = (popularProperty?.photos.length ?? 0) - 1;
    } else {
      prevPhotoIndex = currentPhotoIndex ? currentPhotoIndex - 1 : 1;
    }
    setPopularPropertyPhoto(popularProperty?.photos[prevPhotoIndex] ?? null);
  };

  return (
    <div>
      <div className="home_top relative">
        <img src={assets.home_top} alt="building" />
      </div>
      <div className="home_title">
        <h1>FIND YOUR DREAM</h1>
        <p className="w-80 text-xl">
          We provide a complete service of the sale, purchase or rental of real
          estate.
        </p>
        <a href="/properties">Properties</a>
      </div>
      <div>
        <h1 className="text-center text-4xl font-black mt-11">Top Pick</h1>
        <div className="home_property">
          <div className="relative">
            <img
              src={popularPropertyPhoto ?? popularProperty?.photos[0]}
              alt="first property"
            />
            <div className="arrows">
              <i
                onClick={prevPhoto}
                className="fa-solid fa-chevron-left fa-lg"
              ></i>
              <i
                onClick={nextPhoto}
                className="fa-solid fa-chevron-right fa-lg"
              ></i>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center mt-2 ">
              <p className="bg-teal-600 text-white p-1 rounded-xl text-lg">
                {popularProperty?.type === "house" ? (
                  <i className="fa-solid fa-house fa-sm pr-1"></i>
                ) : (
                  <i className="fa-solid fa-building fa-sm pr-1"></i>
                )}
                {popularProperty?.type}
              </p>
              <p><i className="fa-brands fa-gratipay fa-lg pr-1"></i>{popularProperty?.likes?.length ?? "0"}</p>
              </div>
            <div className="flex justify-between items-center">
              <p
                onClick={() => navigate(`/properties/${popularProperty?.id}`)}
                className="property-title"
              >
                {popularProperty?.name}
              </p>
              <p className="font-bold">
                ${popularProperty?.price}{" "}
                {popularProperty?.deal === "rent" ? "/ month" : "/ buy"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>{popularProperty?.city}</p>
              <p>
                <i className="fa-solid fa-location-dot fa-lg pr-1"></i>
                {popularProperty?.street}
              </p>
            </div>
            <div className="flex gap-3 items-center mt-1">
              <p>
                <i className="fa-solid fa-door-open fa-lg pr-1"></i>
                {popularProperty?.rooms} Rooms
              </p>
              <p>
                <i className="fa-solid fa-bath fa-lg pr-1"></i>
                {popularProperty?.baths} baths
              </p>
              <p>
                <i className="fa-solid fa-expand fa-lg pr-1"></i>
                {popularProperty?.square}m2
              </p>
            </div>
            <div>
              <p className="top_property_description">{popularProperty?.description}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-center text-4xl font-black mt-11">Popular</h1>
          <div className="popular-properties mb-10">
            {properties.slice(0, 6).map((property, index) => (
              <PropertyStyle property={property} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
