import "./SavedProperties.css";
import { useState, useEffect } from "react";
import {
  getAllProperties,
  getSavedPropertiesIds,
} from "../../service/db-service";
import { useUserAuth } from "../../context/userAuthContext";
import { Property } from "../../types/types";
import PropertyStyle from "../Property/Property";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const propertiesFromDb = await getAllProperties();
        if (propertiesFromDb) {
          const propertiesList: Property[] = [];
          propertiesFromDb.forEach((snapshot) => {
            const property = snapshot.val();
            propertiesList.push(property);
          });
          const propertiesIds = await getSavedPropertiesIds(
            user?.displayName ?? ""
          );
          if (propertiesIds && propertiesIds.exists()) {
            const savedPropertiesIds = Object.keys(propertiesIds.val());
            const savedProperties = propertiesList.filter((property) =>
              savedPropertiesIds.includes(property.id)
            );
            setSavedProperties(savedProperties);
            console.log(savedProperties);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedProperties();
  }, [user?.displayName]);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl">Saved Properties</h1>
      <div className="all_saved_properties">
        {savedProperties.length === 0 && <h1>No saved properties</h1>}
        {savedProperties.map((property) => (
          <PropertyStyle key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
