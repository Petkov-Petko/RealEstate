import "./Map.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "./Markers";
import { useEffect, useState } from "react";
interface MapProps {
  coordinates: { lat: number; lng: number } | null;
}

const GoogleMap = (props: MapProps) => {
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: 43.2141,
    lng: 27.9147,
  });

  useEffect(() => {
    if (props.coordinates) {
      setCityCoordinates(props.coordinates);
    }
    // console.log("props.coordinates", props.coordinates);
    // console.log("cityCoordinates", cityCoordinates);
  }, [props.coordinates]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY}>
      <div className="rounded-3xl overflow-hidden">
        <div className="map_container">
          <Map
            defaultZoom={12}
            //! To fix changing the city on the map depending on filters.
            // center={cityCoordinates}
            defaultCenter={cityCoordinates}
            mapId={import.meta.env.VITE_GOOGLE_ID}
          >
            <Markers />
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
``;
