import "./HomeContent.css";
import { assets } from "../../assets/assets";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";
import PropertyStyle from "../Property/Property";

const HomeContent = () => {
  const [properties, setProperties] = useState<Property[]>([]);

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
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  },[]);

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
            <img src={assets.home_top} alt="first property" />
            <div className="arrows">
              <i className="fa-solid fa-chevron-left fa-lg"></i>
              <i className="fa-solid fa-chevron-right fa-lg"></i>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Apartment 1</h3>
            <p className="font-bold text-lg">$231333</p>
            <p>Varna Evlogo Georgiev 14</p>
            <div className="flex gap-2">
              <p>80 m2</p>
              <p>
                <i className="fa-solid fa-door-open fa-lg pr-1"></i>2 Rooms
              </p>
              <p>
                <i className="fa-solid fa-bath fa-lg pr-1"></i>2 Bathrooms
              </p>
            </div>
            <p>some description here</p>
          </div>
        </div>
        <div>
            <h1 className="text-center text-4xl font-black mt-11">Popular</h1>
            <div className="popular-properties">
                {properties.slice(0, 6).map((property, index) => (
                    <PropertyStyle property={property} propertyKey={index} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
