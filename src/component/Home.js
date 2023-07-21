// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import "./Home.css";


// export default function CarCRUD() {
//   const [cars, setCars] = useState([
//     { id: 1,category:"Cars", make: "Toyota", model: "Camry", color: "Silver", registration_no: "ABC123" },
//   ]);
//   const [open, setOpen] = useState(false);
//   const [newCarOpen, setNewCarOpen] = useState(false);
//   const [carToEdit, setCarToEdit] = useState({});
//   const [make, setMake] = useState("");
//   const [category, setCategory] = useState("");

//   const [model, setModel] = useState("");
//   const [color, setColor] = useState("");
//   const [registrationNo, setRegistrationNo] = useState("");
//   const [newMake, setNewMake] = useState("");
//   const [newModel, setNewModel] = useState("");
//   const [newColor, setNewColor] = useState("");
//   const [newRegistrationNo, setNewRegistrationNo] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [isAlert,setIsAlert] = useState(false);


// //   function to get all the cars stored on data base
//   const [shouldFetchCars, setShouldFetchCars] = useState(true);

//   const handleSearch = async () => {
//     const queryParameters = category ;
//     handleGetAllCars(queryParameters);
//   };

//   const handleGetAllCars = async (queryParameters) => {
//     let category = {
//       item:queryParameters
//     }

//    await axios.post('http://localhost:30000/api/car/getCars',category)
//     .then(response => {
//         setIsAlert(true);
//         setCars(response.data.cars)
//         setShouldFetchCars(false);
//     }).catch(error => {
//       console.log("error",error.response.data.msg);
//     });
//    }

//   useEffect(() => {
//     if (shouldFetchCars) {
//         handleGetAllCars();
//     }
//   }, [shouldFetchCars]);

//   const handleDeleteCar = async (_id) => {
//     let token = localStorage.getItem("accessToken");
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//     console.log("car id ==",_id)
//     axios.post('http://localhost:30000/api/car/deleteCar',{_id},config)
//     .then(response => {
//         alert(response.data.msg)
//         setIsAlert(true);
//         setShouldFetchCars(true) 
//     }).catch(error => {
//       console.log("error",error.response.data.msg);
//     });
//   };
//   const handleUpdateCarOpen =  async(_id) => {
//     setOpen(true);
//     setCarToEdit(_id);
//   };
//   const  handleSave =  async() => {
//     let token = localStorage.getItem("accessToken");
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//     let _id = carToEdit
//         const updates = {
//             make:make,
//             model:model,
//             color:color,
//             registration_no:registrationNo
//         }
//         await axios.post('http://localhost:30000/api/car/UpdateCar',{_id,updates},config)
//         .then(response => {
//             alert(response.data.msg)
//             setIsAlert(true);
//         }).catch(error => {
//           console.log("error",error.response.data.msg);
//         });
//         setShouldFetchCars(true) 
//     setOpen(false);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleNewCarOpen = () => {
//     setNewCarOpen(true);
//   };
//   const handleNewCarClose = () => {
//     setNewCarOpen(false);
//   };
//   const handleNewCarSave = (event) => {
//     let token = localStorage.getItem("accessToken");
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
   
//     event.preventDefault();
   
//     let datanewCar = {
//         catgory:category,
//         make: newMake,
//         model: newModel,
//         color: newColor,
//         registrationNo: newRegistrationNo
//     }
//     axios.post('http://localhost:30000/api/car/createCar',datanewCar,config)
//     .then(response => {
//       console.log("responce",response.data);
//       setIsAlert(true);
//       alert(response.data.msg)
//       setIsAlert(true);
//     }).catch(error => {
//       console.log(error.response.data)
//       alert(error.response.data.msg)
//     });
//     setShouldFetchCars(true) 
//     setNewCarOpen(false);
//   };

//   // Logic for displaying current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

// // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// return (
// <div>
// <div className="select-wrapper"> {/* Wrap the select element in a div */}
//         <span className="select-label">Select Category:</span>
//         <select
//           className="select-element" 
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Cars">Cars</option>
//           <option value="Trucks">Trucks</option>
//           <option value="sports">sports</option>

//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>
//   <table> 
//     <thead>
//         <tr>
//         <th>Catgory</th>
//         <th>Make</th>
//         <th>Model</th>
//         <th>Color</th>
//         <th>Registration No</th>
//         <th>Actions</th>
//         </tr>
//     </thead>
//     <tbody>
//         {currentItems.map(car => (
//         <tr key={car.id}>
//           <td>{car.category}</td>
//             <td>{car.make}</td>
//             <td>{car.model}</td>
//             <td>{car.color}</td>
//             <td>{car.registration_no}</td>
//             <td>
//             <div className="actions-div">
//                 <button onClick={() => handleUpdateCarOpen(car,car._id)}>Edit</button>
//                 <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
//             </div>
//             </td>
//         </tr>
//         ))}
//     </tbody>
//     </table>
//     {open && (
//         <div>
//         <h2>Edit Car</h2>
//         <label>
//         Category:
//         <input
//             type="text"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//         />
//         </label>
//         <br />
//         <label>
//         Make:
//         <input
//             type="text"
//             value={make}
//             onChange={e => setMake(e.target.value)}
//         />
//         </label>
//         <br />
//         <label>
//         Model:
//         <input
//         type="text"
//         value={model}
//         onChange={e => setModel(e.target.value)}
//         />
//         </label>
//         <br />
//         <label>
//         Color:
//         <input
//         type="text"
//         value={color}
//         onChange={e => setColor(e.target.value)}
//         />
//         </label>
//         <br />
//         <label>
//         Registration No:
//         <input
//         type="text"
//         value={registrationNo}
//         onChange={e => setRegistrationNo(e.target.value)}
//         />
//         </label>
//         <br />
//         <button onClick={()=>handleSave()}>Save</button>
//         <button onClick={handleClose}>Cancel</button>
//         </div>
//     )}
//     {newCarOpen && (
//     <div>
//     <h2>Create New Car</h2>
//     <label>
//     Category:
//     <input
//     type="text"
//     value={category}
//     onChange={e => setCategory(e.target.value)}
//     />
//     </label>
//     <br />
//     <label>
//     Make:
//     <input
//     type="text"
//     value={newMake}
//     onChange={e => setNewMake(e.target.value)}
//     />
//     </label>
//     <br />
//     <label>
//         Model:
//         <input
//         type="text"
//         value={newModel}
//         onChange={e => setNewModel(e.target.value)}
//         />
//     </label>
//     <br />
//     <label>
//         Color:
//         <input
//         type="text"
//         value={newColor}
//         onChange={e => setNewColor(e.target.value)}
//         />
//     </label>
//       <br />
//       <label>
//         Registration No:
//         <input
//           type="text"
//           value={newRegistrationNo}
//           onChange={e => setNewRegistrationNo(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={(event)=>handleNewCarSave(event)}>Save</button>
//       <button onClick={handleNewCarClose}>Cancel</button>
//      </div>
//     )}
//       <div className="pagination">
//        {Array.from({ length: Math.ceil(cars.length / itemsPerPage) }, (_, i) => (
//        <button key={i} onClick={() => paginate(i + 1)}>
//         {i + 1}
//       </button>
//      ))}
//     </div>
//     <button onClick={handleNewCarOpen}>Create New Car</button>

//     </div>
// );
// }
