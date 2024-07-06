import "./PropertiesForm.css";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { Property } from "../../types/types";
import GoogleMap from "../Map/Map";
import PropertyStyle from "../Property/Property";

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
            <PropertyStyle key={index} property={property} />
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
