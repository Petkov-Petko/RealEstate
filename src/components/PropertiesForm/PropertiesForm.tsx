import "./PropertiesForm.css";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";
import GoogleMap from "../Map/Map";


const PropertiesForm = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    homeType: "All types",
    city: "Varna",
    deal: "buy",
  });
  const [coordinates, setCoordinates] = useState({ lat: 43.2141, lng: 27.9147 } as { lat: number, lng: number } | null);


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
          setFilteredProperties(propertiesList);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);



    const filterProperties = () => {
      console.log(filters);
      if (filters.city === "Sofia") {
        setCoordinates({ lat: 42.6977, lng: 23.3219 });
      }else{
        setCoordinates({ lat: 43.212369565056974, lng: 27.910891777045777 });
      }
      const filteredProperties = properties.filter((property) => {
        return (
          (filters.homeType === "All types" ||
            property.type === filters.homeType) &&
          (filters.city === "all" || property.city === filters.city) &&
          (filters.deal === "buy" || property.deal === filters.deal)
        );
      });
      setFilteredProperties(filteredProperties);
    };

  return (
    <div>
      <div className="propertyFilter">
        <select
          value={filters.homeType}
          onChange={(e) => setFilters({ ...filters, homeType: e.target.value })}
          name="homeType"
          id="homeType"
          className="property-filters"
        >
          <option value="All types">All types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          name="city"
          id="city"
          className="property-filters"
        >
          <option value="Varna">Varna</option>
          <option value="Sofia">Sofia</option>
          <option value="all">All</option>
        </select>
        <select 
          value={filters.deal}
          onChange={(e) => setFilters({ ...filters, deal: e.target.value })}
        name="deal" id="deal" className="property-filters">
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <input
          type="text"
          placeholder="Max Price"
          className="property-filters"
        />
        <button onClick={filterProperties} className="property-filters">
          <i className="fa-solid fa-filter fa-lg"></i>Filter
        </button>
      </div>
      <div className="flex mx-4 gap-3">
        <div className="all-properties">
          {filteredProperties.length === 0 && (<div>No properties found</div>)}
          {filteredProperties.map((property, index) => (
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
                <p className="font-bold">${property.price}</p>
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
        <div className="all-properties-map">
          <GoogleMap coordinates ={coordinates}/>
        </div> 
      </div>
    </div>
  );
};

export default PropertiesForm;
