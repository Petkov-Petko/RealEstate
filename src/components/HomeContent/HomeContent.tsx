import "./HomeContent.css";
import { assets } from "../../assets/assets";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";
import PropertyStyle from "../Property/Property";

const HomeContent = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [popularProperty, setPopularProperty] = useState<Property | null>(null);
  const [popularPropertyPhoto, setPopularPropertyPhoto] = useState<string | null>(null);

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
          setProperties(propertiesList);
          setPopularProperty(propertiesList[0]);
          setPopularPropertyPhoto(propertiesList[0].photos[0]);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
    console.log(popularProperty);
    
  }, []);

  const nextPhoto = () => {
    const currentPhotoIndex = popularProperty?.photos.indexOf(popularPropertyPhoto ?? "");
    let nextPhotoIndex;
    if(popularProperty && currentPhotoIndex === popularProperty?.photos.length - 1){
        nextPhotoIndex = 0;
    }else{
        nextPhotoIndex = currentPhotoIndex ? currentPhotoIndex + 1 : 1;
    }
    setPopularPropertyPhoto(popularProperty?.photos[nextPhotoIndex] ?? null);
  };

  const prevPhoto = () => {
    const currentPhotoIndex = popularProperty?.photos.indexOf(popularPropertyPhoto ?? "");
    let prevPhotoIndex;
    if(currentPhotoIndex === 0) {
        prevPhotoIndex = (popularProperty?.photos.length ?? 0) - 1;
    }else{
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
        <p className="w-96 text-xl">
          We provide a complete service of the sale, purchase or rental of real
          estate.
        </p>
        <a href="/properties">Properties</a>
      </div>
      <div>
        <h1 className="text-center text-4xl font-black mt-11">Top Pick</h1>
        <div className="home_property">
          <div className="relative">
            <img src={popularPropertyPhoto ?? popularProperty?.photos[0]} alt="first property" />
            <div className="arrows">
              <i onClick={prevPhoto} className="fa-solid fa-chevron-left fa-lg"></i>
              <i onClick={nextPhoto} className="fa-solid fa-chevron-right fa-lg"></i>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3>{popularProperty?.name}</h3>
            <p className="font-bold text-lg">{popularProperty?.price}</p>
            <p>{popularProperty?.street}</p>
            <div className="flex gap-2">
              <p>{popularProperty?.square} m2</p>
              <p>
                <i className="fa-solid fa-door-open fa-lg pr-1"></i>{popularProperty?.rooms} Rooms
              </p>
              <p>
                <i className="fa-solid fa-bath fa-lg pr-1"></i>{popularProperty?.baths} Bathrooms
              </p>
            </div>
            <p>{popularProperty?.description}</p>
          </div>
        </div>
        <div>
          <h1 className="text-center text-4xl font-black mt-11">Popular</h1>
          <div className="popular-properties">
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
