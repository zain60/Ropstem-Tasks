import React from "react";
import "./CarTable.css";

const CarTable = ({ cars, handleUpdateCarOpen, handleDeleteCar }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Make</th>
          <th>Model</th>
          <th>Color</th>
          <th>Registration No</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars&&cars.map((car) => (
          <tr key={car._id}>
            <td>{car.category}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.color}</td>
            <td>{car.registration_no}</td>
            <td>
              <div className="actions-div">
                <button onClick={() => handleUpdateCarOpen(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
