/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import CarSearch from "./CarSearch";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import Pagination from "./Pagination";

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
	const [itemsPerPage] = useState(5);
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

    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      };
    
      const handleNextPage = () => {
        const maxPage = Math.ceil(cars.length / itemsPerPage);
        if (currentPage < maxPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
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
		};

		try {
			const response = await axios.post(
				"http://localhost:30000/api/car/getCars",
				category
			);
                const startIdx = (currentPage - 1) * itemsPerPage;
                const endIdx = startIdx + itemsPerPage;
                const carsForPage = cars.slice(startIdx, endIdx);
            
                setCars(carsForPage);
                setIsAlert(true);
                setShouldFetchCars(false);
		} catch (error) {
			console.log("error", error.response.data.msg);
		}
	};


    useEffect(() => {
        if (shouldFetchCars) {
          handleGetAllCars(category);
        }
      }, [shouldFetchCars, category, currentPage])

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
					<h2>Edit Car</h2>
					<label>
						category:
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
					<button onClick={(e) => handleSave()}>Save</button>
					<button onClick={() => handleNewCarClose()}>cancle</button>
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
        cars={cars}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        paginate={setCurrentPage}
      />
    </div>
	);
};

export default CarCRUD;
