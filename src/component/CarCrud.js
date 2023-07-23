/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import CarSearch from "./CarSearch";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import Pagination from "./Pagination";
import EditCar from "./EditCar";

const CarCRUD = () => {
	const [cars, setCars] = useState([
		{
			id: 1,
			category: "Cars",
			make: "Toyota",
			model: "Camry",
			color: "Silver",
			registration_no: "ABC123",
		},
	]);
    const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [newCarOpen, setNewCarOpen] = useState(false);
	const [carToEdit, setCarToEdit] = useState({});
	const [make, setMake] = useState("");
	const [category, setCategory] = useState("");
	const [model, setModel] = useState("");
	const [color, setColor] = useState("");
	const [carId, setCarId] = useState();
	const [registrationNo, setRegistrationNo] = useState("");
	const [newMake, setNewMake] = useState("");
	const [newModel, setNewModel] = useState("");
	const [newColor, setNewColor] = useState("");
	const [newRegistrationNo, setNewRegistrationNo] = useState("");
	const [totalPage,setTotalPages] = useState();
	const [isAlert, setIsAlert] = useState(false);
	const [shouldFetchCars, setShouldFetchCars] = useState(true);

	const handleUpdateCarOpen = (car) => {
		setOpen(true);
		setCarId(car._id);
		setCarToEdit(car);
		setMake(car.make);
		setModel(car.model);
		setColor(car.color);
		setRegistrationNo(car.registration_no);
	};

	// Function to handle saving an edited car
	const handleSave = async (e) => {
		let token = localStorage.getItem("accessToken");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		let _id = carId;

		const updates = {
			category,
			make,
			model,
			color,
			registration_no: registrationNo,
		};

		try {
			//   await axios.post(`http://localhost:30000/api/car/UpdateCar/${carToEdit._id}`, updates, config);
			await axios.post(
				"http://localhost:30000/api/car/UpdateCar",
				{ _id, updates },
				config
			);
			alert("Car updated successfully!");
			setShouldFetchCars(true);
			setOpen(false);
		} catch (error) {
			console.log("error", error.response.data.msg);
		}
	};

	// Function to handle deleting a car
	const handleDeleteCar = async (_id) => {
		let token = localStorage.getItem("accessToken");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			axios.post("http://localhost:30000/api/car/deleteCar", { _id }, config);
			setShouldFetchCars(true);
			alert("Car deleted successfully!");
		} catch (error) {
			console.log("error", error.response.data.msg);
		}
	};

	const handleNewCarSave = async (data) => {
		let token = localStorage.getItem("accessToken");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		console.log(JSON.stringify(data)); // Log the content of dataNewCar to inspect it
		try {
			await axios.post(
				"http://localhost:30000/api/car/createCar",
				data,
				config
			);
			setShouldFetchCars(true);
			setNewCarOpen(false);
			alert("New car created successfully!");
		} catch (error) {
			console.log("error", error.response?.data?.msg); // Use optional chaining to safely access the error message
		}
	};

	const handleSearch = () => {
		setShouldFetchCars(true);
	};
	const handleNewCarClose = () => {
		setOpen(false);
	};
	const handlecancelNewCar = () => {
		setNewCarOpen(false);
	};

	// Function to handle creating a new car

	const handleNewCarOpen = () => {
		setNewCarOpen(true);
	};
	const handleCreateNewCar = () => {
		setNewCarOpen(false);
	};

	const handleGetAllCars = async (queryParameters) => {
		let category = {
			item: queryParameters,
			page:currentPage
		};

		try {
			const response = await axios.post(
				"http://localhost:30000/api/car/getCars",
				category
			);
            	setCars(response.data.cars)
				setTotalPages(response?.data?.totalCount)
				 setTotalPages(Math.ceil(response?.data?.totalCount / 4));
                setIsAlert(true);
				if(currentPage==totalPage){
					setCurrentPage(1)
				}
				
                setShouldFetchCars(false);
		} catch (error) {
			console.log("error", error.response.data.msg);
		}
	};


    useEffect(() => {
        if (shouldFetchCars) {
				handleGetAllCars(category);	
        }
      }, [currentPage,shouldFetchCars, category])

	  const handleSetCurrentPage = (pageNumber) => {
		setCurrentPage(pageNumber);
		setShouldFetchCars(true);
	  };
	  

	return (
		<div>
			<CarSearch
				category={category}
				setCategory={setCategory}
				handleSearch={handleSearch}
			/>
			<CarTable
				cars={cars}
				handleUpdateCarOpen={handleUpdateCarOpen}
				handleDeleteCar={handleDeleteCar}
			/>
			{open && (
				<div>
				<EditCar car={carToEdit} handleUpdateCarOpen={setOpen} />
			  </div>
			)}

			{newCarOpen ? (
				<div>
					<CarForm
						handleNewCarSave={handleNewCarSave}
						handleCreateNewCar={handleCreateNewCar}
						handlecancelNewCar={handlecancelNewCar}
						category={category}
					/>
				</div>
			) : (
				<button onClick={()=>handleNewCarOpen()}>Create New Car</button>
		)}
		<Pagination
        currentPage={currentPage}
        totalPage={totalPage}
		paginate={handleSetCurrentPage}
      />
    </div>
	);
	
};

export default CarCRUD;
