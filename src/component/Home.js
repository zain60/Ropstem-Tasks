import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Home.css";

export default function CarCRUD() {
  const [cars, setCars] = useState([
    { id: 1, make: "Toyota", model: "Camry", color: "Silver", registrationNo: "ABC123" },
    { id: 2, make: "Honda", model: "Civic", color: "Blue", registrationNo: "DEF456" },
    { id: 3, make: "Ford", model: "Mustang", color: "Red", registrationNo: "GHI789" }
  ]);
  const [open, setOpen] = useState(false);
  const [newCarOpen, setNewCarOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState({});
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newRegistrationNo, setNewRegistrationNo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);




  const handleGetAllCars = async (event) => {
    axios.get('http://localhost:30000/api/car/getCars')
    .then(response => {
        setCars(response.data.cars)
    }).catch(error => {
      console.log("error",error.response.data.msg);
    });
  };
  
  useEffect(() => {
    // Fetch the data from API
    handleGetAllCars();
  }, []);

  const handleClickOpen = car => {
    setOpen(true);
    setCarToEdit(car);
    setMake(car.make);
    setModel(car.model);
    setColor(car.color);
    setRegistrationNo(car.registrationNo);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
 
    setCars(prevCars => {
      const newCars = prevCars.map(car => {
        if (car.id === carToEdit.id) {
          return {
            id: car.id,
            make: make,
            model: model,
            color: color,
            registrationNo: registrationNo
          };
        }
        return car;
      });
      return newCars;
    });
    setOpen(false);
  };

  const handleDelete = id => {
    setCars(prevCars => prevCars.filter(car => car.id !== id));
  };

  const handleNewCarOpen = () => {
    setNewCarOpen(true);
  };

  const handleNewCarClose = () => {
    setNewCarOpen(false);
  };

  const handleNewCarSave = (event) => {
    event.preventDefault();
    let datanewCar = {
        make: newMake,
        model: newModel,
        color: newColor,
        registrationNo: newRegistrationNo
    }
    axios.post('http://localhost:30000/api/car/createCar',datanewCar)
    .then(response => {
      console.log("responce",response.data);
      alert(response.data.msg)
    }).catch(error => {
      console.log(error.response.data)
      alert(error.response.data.msg)
    });
    setNewCarOpen(false);
  };

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);

return (
<div>
<button onClick={handleNewCarOpen}>Create New Car</button>
<table>
<thead>
  <tr>
    <th>Make</th>
    <th>Model</th>
    <th>Color</th>
    <th>Registration No</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
{currentItems.map(car => (
<tr key={car.id}>
<td>{car.make}</td>
<td>{car.model}</td>
<td>{car.color}</td>
<td>{car.registration_no}</td>
<td>
  <div className="actions-div">
    <button onClick={() => handleClickOpen(car)}>Edit</button>
    <button onClick={() => handleDelete(car.id)}>Delete</button>
  </div>
</td>


</tr>
))}
</tbody>
</table>
{open && (
<div>
<h2>Edit Car</h2>
<label>
Make:
<input
type="text"
value={make}
onChange={e => setMake(e.target.value)}
/>
</label>
<br />
<label>
Model:
<input
type="text"
value={model}
onChange={e => setModel(e.target.value)}
/>
</label>
<br />
<label>
Color:
<input
type="text"
value={color}
onChange={e => setColor(e.target.value)}
/>
</label>
<br />
<label>
Registration No:
<input
type="text"
value={registrationNo}
onChange={e => setRegistrationNo(e.target.value)}
/>
</label>
<br />
<button onClick={()=>handleSave()}>Save</button>
<button onClick={handleClose}>Cancel</button>
</div>
)}
{newCarOpen && (
<div>
<h2>Create New Car</h2>
<label>
Make:
<input
type="text"
value={newMake}
onChange={e => setNewMake(e.target.value)}
/>
</label>
<br />
<label>
Model:
<input
type="text"
value={newModel}
onChange={e => setNewModel(e.target.value)}
/>
</label>
<br />
<label>
Color:
<input
type="text"
value={newColor}
onChange={e => setNewColor(e.target.value)}
/>
</label>
      <br />
      <label>
        Registration No:
        <input
          type="text"
          value={newRegistrationNo}
          onChange={e => setNewRegistrationNo(e.target.value)}
        />
      </label>
      <br />
      <button onClick={(event)=>handleNewCarSave(event)}>Save</button>
      <button onClick={handleNewCarClose}>Cancel</button>
    </div>
  )}
  <div className="pagination">
    {Array.from({ length: Math.ceil(cars.length / itemsPerPage) }, (_, i) => (
      <button key={i} onClick={() => paginate(i + 1)}>
        {i + 1}
      </button>
    ))}
  </div>
</div>
);
}
