import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Property } from "../../types/types";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";



const Markers = ({ properties }: { properties: Property[] }) => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  
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
          setAllProperties(propertiesList);
          console.log(propertiesList);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      {allProperties.map((property, index) => (
        <AdvancedMarker key={index} position={{ lat: property.lat, lng: property.lng }}>
            <span>✅</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Markers;
