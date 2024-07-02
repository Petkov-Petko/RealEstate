import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";


type Prop = {
    key: string;
    name: string;
    lat: number;
    lng: number;
  };

const Markers = () => {
    const [properties, setProperties] = useState<Prop[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getAllProperties();
            if(snapshot){
                const properties = snapshot.val();
                if (properties) {
                    
                    const formattedProperties = Object.values(properties).map((prop: any) => ({
                        name: prop.name,
                        lat: prop.lat,
                        lng: prop.lng,
                        key: JSON.stringify({ name: prop.name, lat: prop.lat, lng: prop.lng }),
                    }));
                    setProperties(formattedProperties);   
                    console.log("formattedProperties", formattedProperties);
                          
                }
            }
           
        };
        fetchData();
    }, []);

  return (
    <>
      {properties.map((point, i) => (
        <AdvancedMarker position={point} key={i}>
          <span>✅</span>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Markers;
