import "./Property.css"
import { Property } from "../../types/types";

const PropertyStyle = ({property, propertyKey}: {property: Property, propertyKey: number}) => {
    console.log();
    
  return (
    <div>
      <div key={propertyKey} className="property">
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
                <p>{property.square}squares</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="property-title">{property.name}</p>
                <p className="font-bold">${property.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>{property.city}</p>
                <p>{property.street}</p>
              </div>
              <div className="flex gap-4 items-center">
                <p>{property.rooms}rooms</p>
                <p>{property.baths}baths</p>
              </div>
            </div>
    </div>
  )
}

export default PropertyStyle
