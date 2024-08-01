import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { getAllProperties } from "../../service/db-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Prop = {
  key: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  type: string;
  price: number;
  deal: string;
  likes: number;
  id: string;
};

const Markers = () => {
  const [properties, setProperties] = useState<Prop[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getAllProperties();
      if (snapshot) {
        const properties = snapshot.val();
        if (properties) {
          const formattedProperties = Object.values(properties).map(
            (prop: any) => ({
              id: prop.id,
              image: prop.photos[0],
              type: prop.type,
              price: prop.price,
              deal: prop.deal,
              name: prop.name,
              lat: prop.lat,
              lng: prop.lng,
              likes: prop.likes?.length ?? 0,
              key: JSON.stringify({
                name: prop.name,
                lat: prop.lat,
                lng: prop.lng,
              }),
            })
          );
          setProperties(formattedProperties);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {properties.map((point, i) => (
        <AdvancedMarker position={point} key={i}>
          <div  style={{ pointerEvents: 'auto' }} onClick={()=> navigate(`/properties/${point.id}`)} className="marker_property flex cursor-pointer">
            <div>
              <img src={point.image} alt={point.name} />
            </div>
            <div className="marker_property_text pl-1 max-w-44 max-h-16 overflow-auto">
              <h1 className="text-lg truncate">{point.name}</h1>
              <p className="font-bold">
                ${point.price} {point?.deal === "rent" ? "/ month" : "/ buy"}
              </p>
              <p className="font-medium mt-1">
                {point.type} <i className="fa-brands fa-gratipay fa-lg pr-1"></i> {point?.likes}
              </p>
            </div>
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Markers;
