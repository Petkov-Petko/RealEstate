import "./AddProperty.css";
import { useState } from "react";
import { Property } from "../../../types/types";
import { addProperty, updateProperty } from "../../../service/db-service";
import { uploadFile, getFiles } from "../../../service/storage";

const AddProperty = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [property, setProperty] = useState<Property>({
    name: "",
    square: null,
    price: null,
    rooms: null,
    type: "house",
    baths: null,
    city: "Varna",
    street: "",
    description: "",
    deal: "buy",
    photos: [],
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: File[] = Array.from(files);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      console.log(photos);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        property.name === "" ||
        property.description === "" ||
        property.square === null ||
        property.price === null ||
        property.rooms === null ||
        property.baths === null ||
        property.city === "" ||
        property.street === ""
      ) {
        setErrorMessage("All fields are required!");
        return;
      }
      if (
        property.square <= 0 ||
        property.price <= 0 ||
        property.rooms <= 0 ||
        property.baths <= 0
      ) {
        setErrorMessage("Fields must be greater than 0!");
        return;
      }
      console.log(photos);

      const id = await addProperty(property);
      if (id) {
        try {
          await addPhotosToProperty(id);
          const photos = await getFiles(id);

          await updateProperty(id, {
            ...property,
            photos: photos,
          });
        } catch (error) {
          console.error("Error during photo operations:", error);
        }
      } else {
        console.log("error in id");
      }

      setSuccessMessage("Property added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const addPhotosToProperty = async (propertyId: string) => {
    try {
      for (let i = 0; i < photos.length; i++) {
        await uploadFile(propertyId, photos[i], photos[i].name);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <div>
        <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
          <h2 className="ai-story-maker-dream-form text-black font-bold text-2xl">
            Add Property
          </h2>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}
          <div className="mt-4">
            <label className="text-black" htmlFor="title">
              Name
            </label>
            <input
              value={property.name}
              onChange={(e) =>
                setProperty({ ...property, name: e.target.value })
              }
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              type="text"
              placeholder="Enter the name of the property"
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-black" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="description"
              placeholder="Enter the description of the property"
              value={property.description}
              onChange={(e) =>
                setProperty({ ...property, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black" htmlFor="emotions">
                Squares
              </label>
              <input
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                type="number"
                placeholder="Enter the square of the property"
                value={property.square === null ? "" : property.square}
                onChange={(e) =>
                  setProperty({ ...property, square: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-black" htmlFor="symbols">
                Price
              </label>
              <input
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                type="number"
                placeholder="Enter the price of the property"
                value={property.price === null ? "" : property.price}
                onChange={(e) =>
                  setProperty({ ...property, price: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black" htmlFor="emotions">
                City
              </label>
              <select
                value={property.city}
                onChange={(e) =>
                  setProperty({ ...property, city: e.target.value })
                }
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              >
                <option value="varna">Varna</option>
                <option value="sofia">Sofia</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-black" htmlFor="symbols">
                Street
              </label>
              <input
                placeholder="Enter the street of the property"
                value={property.street}
                onChange={(e) =>
                  setProperty({ ...property, street: e.target.value })
                }
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                type="text"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black" htmlFor="emotions">
                Rooms
              </label>
              <input
                value={property.rooms === null ? "" : property.rooms}
                onChange={(e) =>
                  setProperty({ ...property, rooms: Number(e.target.value) })
                }
                placeholder="Enter the rooms of the property"
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                type="number"
                required
              />
            </div>

            <div className="flex-1">
              <label className="text-black" htmlFor="symbols">
                Baths
              </label>
              <input
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
                type="number"
                placeholder="Enter the baths of the property"
                value={property.baths === null ? "" : property.baths}
                onChange={(e) =>
                  setProperty({ ...property, baths: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black" htmlFor="emotions">
                Type
              </label>
              <select
                value={property.type}
                onChange={(e) =>
                  setProperty({ ...property, type: e.target.value })
                }
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-black" htmlFor="emotions">
                Deal
              </label>
              <select
                value={property.deal}
                onChange={(e) =>
                  setProperty({ ...property, deal: e.target.value })
                }
                className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
            <input
              type="file"
              multiple
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="mt-4 flex flex-row space-x-2">
            <div className="photos-preview flex w-full">
              {photos.map((photo, index) => (
                <>
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="rounded-md p-2 mb-4 w-48"
                  />
                </>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900"
              id="generate-button"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

{
  /* <div className="photos-preview flex w-full">
{photos.map((photo, index) => (
  <>
    <img
      key={index}
      src={URL.createObjectURL(photo)}
      alt={`Uploaded ${index + 1}`}
      className="rounded-md p-2 mb-4 w-48"
    />
  </>
))}
</div> */
}
