import "./Map.css";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Property } from "../../types/types";
import axios from "axios";
// import { Marker } from "@vis.gl/react-google-maps";


interface MapProps {
  coordinates: { lat: number; lng: number } | null;
  properties: Property[];
}

const Map = (props: MapProps) => {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);


  useEffect(() => {
    const fetchCoordinates = async () => {
        
      const promises = props.properties.map(property =>
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(property.street)} ${property.city}&key=${import.meta.env.VITE_GOOGLE_KEY}`)
      );
      const results = await Promise.all(promises);
      const newMarkers = results
        .filter(result => result.data.status === "OK" && result.data.results.length > 0) 
        .map(result => result.data.results[0].geometry.location);
      
  
      setMarkers(newMarkers);
    };
  
    fetchCoordinates();
  }, [props.properties]);

  
  return (
    <div className="mapContainerStyle">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_KEY}}
        defaultCenter={
          props.coordinates?.lat && props.coordinates?.lng
            ? props.coordinates
            : undefined
        }
        center={
          props.coordinates?.lat && props.coordinates?.lng
            ? props.coordinates
            : undefined
        }
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        // options={""}
        // onChange={""}
        // onChildClick={""}
      >
        
         
   
      </GoogleMapReact>
    </div>
  );
};

export default Map;
