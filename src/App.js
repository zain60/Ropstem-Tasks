import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth";
import Home from "./component/Home";
import Navbar from "./component/Navbar"; 
import Footer from "./component/Footer"; 
import CarCRUD from "./component/CarCrud";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Home" element={<CarCRUD />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
