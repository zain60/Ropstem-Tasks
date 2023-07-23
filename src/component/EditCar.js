import React, { useState } from "react";
import axios from "axios";
import "./Model.css"

const EditCar = ({ car, handleUpdateCarOpen }) => {
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [color, setColor] = useState(car.color);
  const [category, setCategory] = useState(car.category);

  const [registrationNo, setRegistrationNo] = useState(car.registration_no);

  const handleSave = async () => {
    let token = localStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const updates = {
        category,
      make,
      model,
      color,
      registration_no: registrationNo,
    };

    try {
     let res =  await axios.post(
        "http://localhost:30000/api/car/UpdateCar",
        { _id: car._id, updates },
        config
      );
      console.log("data-->",res)
      alert(res.data.msg);
      handleUpdateCarOpen(false);
    } catch (error) {
      alert( error.response.data.msg);
      handleUpdateCarOpen(false);

    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <span className="close-btn" onClick={() => handleUpdateCarOpen(false)}>
          &times;
        </span>
        <h2>Edit Car</h2>
        <br></br>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Make:
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Registration No:
          <input
            type="text"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
          />
        </label>
        <br />
        <button onClick={()=>handleSave()}>Save</button>
        <button onClick={() => handleUpdateCarOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};


export default EditCar;
