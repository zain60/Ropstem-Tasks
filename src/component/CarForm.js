import React, { useState } from "react";
import Modal from "./Model";
import "./Home.css";

const CarForm = ({ handleNewCarSave,handlecancelNewCar }) => {
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newColor, setNewColor] = useState("");
  const[category,setCategory] = useState("");
  const [newRegistrationNo, setNewRegistrationNo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      category:category,
      make: newMake,
      model: newModel,
      color: newColor,
      registrationNo: newRegistrationNo,
    };
    handleNewCarSave(formData);
    setShowModal(false);
  };




  return (
    <div>
      <button onClick={handleOpenModal}>Create New Car</button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <div className="card">
          <h2>Create New Car</h2>
          <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          Make:
          <input
            type="text"
            value={newMake}
            onChange={(e) => setNewMake(e.target.value)}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Registration No:
          <input
            type="text"
            value={newRegistrationNo}
            onChange={(e) => setNewRegistrationNo(e.target.value)}
          />
        </label>
        <br />
        <button onClick={(e) => handleNewCarSave(e)} type="submit">Save</button>
        <button onClick={(e) => handlecancelNewCar(e)} type="submit">cancel</button>

      </form>
        </div>
      </Modal>
    </div>
  );
};

export default CarForm;

