import "./Map.css";

import { Property } from "../../types/types";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from "@vis.gl/react-google-maps"

interface MapProps {
  coordinates: { lat: number; lng: number } | null;
  properties: Property[];
}

const GoogleMap = (props: MapProps) => {
  const position = { lat: 43.2141, lng: 27.9147 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_KEY}>
      <div className="mapContainerStyle">
        <Map defaultZoom={12} defaultCenter={position} mapId={import.meta.env.VITE_GOOGLE_ID}>
           <AdvancedMarker position={position}>
            
           </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
``