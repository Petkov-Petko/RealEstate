import "./Property.css"
import { Property } from "../../types/types";
import { useNavigate } from "react-router-dom";

const PropertyStyle = ({property}: {property: Property}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div  className="property">
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
                <p><i className="fa-brands fa-gratipay fa-lg pr-1"></i>{property.likes?.length ?? "0"}</p>

              </div>
              <div className="flex justify-between items-center">
                <p onClick={()=> navigate(`/properties/${property.id}`)} className="property-title">{property.name}</p>
                <p className="font-bold">${property.price} {property?.deal === "rent" ? "/ month" : "/ buy"}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>{property.city}</p>
                <p className="max-w-48 truncate"><i className="fa-solid fa-location-dot fa-lg pr-1"></i>{property.street}</p>
              </div>
              <div className="flex gap-3 items-center mt-1">
                <p><i className="fa-solid fa-door-open fa-lg pr-1"></i>{property.rooms} Rooms</p>
                <p><i className="fa-solid fa-bath fa-lg pr-1"></i>{property.baths} baths</p>
                <p><i className="fa-solid fa-expand fa-lg pr-1"></i>{property.square}m2</p>
              </div>
            </div>
    </div>
  )
}

export default PropertyStyle
