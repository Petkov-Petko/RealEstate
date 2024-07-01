import "./Map.css";
// import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Property } from "../../types/types";

// import { Marker } from "@vis.gl/react-google-maps";
import Markers from "./Markers";


interface MapProps {
  coordinates: { lat: number; lng: number } | null;
  properties: Property[];
}

const Map = (props: MapProps) => {
  // const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
console.log(props.properties);


  // useEffect(() => {
  //   const fetchCoordinates = async () => {
        
  //     const promises = props.properties.map(property =>
  //       axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(property.street)} ${property.city}&key=${import.meta.env.VITE_GOOGLE_KEY}`)
  //     );
  //     const results = await Promise.all(promises);
  //     const newMarkers = results
  //       .filter(result => result.data.status === "OK" && result.data.results.length > 0) 
  //       .map(result => result.data.results[0].geometry.location);
      
  
  //     setMarkers(newMarkers);
  //   };
  
  //   fetchCoordinates();
  // }, [props.properties]);

  
  return (
    <div className="mapContainerStyle">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_KEY}}
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

        {props.properties?.map((place, i)=> (
          <div lat={Number(place.lat)} lng={Number(place.lng)} key={i}>
            ✅
          </div>
        ))}
        
        {/* <Markers properties={props.properties}/> */}
   
      </GoogleMapReact>
    </div>
  );
};

export default Map;
