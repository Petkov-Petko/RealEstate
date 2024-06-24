import "./PropertiesForm.css";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";

const PropertiesForm = () => {
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
  }, []);



  return (
    <div>
      <div className="propertyFilter">
        <select name="homeType" id="homeType" className="property-filters">
          <option value="all">All types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
        <select name="city" id="city" className="property-filters">
          <option value="varna">Varna</option>
          <option value="sofia">Sofia</option>
          <option value="all">All</option>
        </select>
        <select name="deal" id="deal" className="property-filters">
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <input type="text" placeholder="Max Price" className="property-filters"/>
        <button className="property-filters"><i className="fa-solid fa-filter fa-lg"></i>Filter</button>
      </div>
      <div className="flex mx-4 gap-3">
        <div className="all-properties">
          {properties.map((property, index) => (
            <div key={index} className="property">
              <div>
                <img src={property.photos[0]} alt="property" />
              </div>
              <div className="flex justify-between items-center mt-2 ">
                <p className="bg-teal-600 text-white p-1 rounded-xl">
                  {property.type === "house" ? (
                    <i className="fa-solid fa-house fa-sm pr-1"></i>
                  ) : (
                    <i className="fa-solid fa-building fa-sm pr-1"></i>
                  )}
                  {property.type}
                </p>
                <p>{property.square}squares</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="property-title">{property.name}</p>
                <p className="property-title">${property.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>{property.city}</p>
                <p>{property.street}</p>
              </div>
              <div className="flex gap-4 items-center">
                <p>{property.rooms}rooms</p>
                <p>{property.baths}baths</p>
              </div>
            </div>
          ))}
        </div>
        <div className="all-properties-map"></div>
      </div>
    </div>
  );
};

export default PropertiesForm;
