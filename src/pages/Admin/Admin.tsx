import "./Admin.css";
import AddProperty from "../../components/AdminOptions/AddProperty/AddProperty";
import { useState } from "react";

const Admin = () => {
  const [selectedOption, setSelectedOption] = useState("users");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
 
  return (
    <div>
      <div className="radio-inputs">
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="users"
            onChange={handleOptionChange}
            checked={selectedOption === "users"}
          />
          <span className="name">Users</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="properties"
            onChange={handleOptionChange}
            checked={selectedOption === "properties"}
          />
          <span className="name">Properties</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="addProperty"
            onChange={handleOptionChange}
            checked={selectedOption === "addProperty"}
          />
          <span className="name">Add Property</span>
        </label>
      </div>
      {selectedOption === "users" && <div>Users</div>}
      {selectedOption === "properties" && <div>Properties</div>}
      {selectedOption === "addProperty" && <AddProperty />}
    </div>
  );
};

export default Admin;
