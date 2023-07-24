# Car Management System - Backend

This repository contains the backend code for a Car Management System. The system allows users to perform CRUD  operations on cars. It provides APIs for creating, updating, deleting, and searching cars.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Nodemailer for sending emails

## Installation

1. Clone the repository to your local machine.

2. Install the required dependencies by running the following command:
npm install 


3. Create a `.env` file in the root directory  or  add the following environment variables in existing env:

PORT=3000
MONGODB_URI="your_mongodb_connection_string"
ACCESS_TOKEN_SECRET="your_access_token_secret"

4. Start the server by running the following command:
npm run dev


The server will start on port 3000 by default. You can change the port by modifying the `PORT` environment variable in the `.env` file.

## API Endpoints

base URL ||http://localhost:30000 + 
{
- POST /api/car/createCar: Create a new car.
- POST /api/car/getCars: Get a list of cars based on search parameters.
- POST /api/car/UpdateCar: Update a car.
- POST /api/car/deleteCar: Delete a car.
}

## Authentication

The backend uses JWT for authentication. To access protected routes, include the JWT token in the `Authorization` header of the request.

## Error Handling

Errors are handled using Express middleware. If an error occurs, the server will respond with an appropriate error message.

## Database

The backend uses MongoDB as the database to store car information. Make sure you have MongoDB installed and running on your system.



