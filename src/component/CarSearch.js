import React from "react";

const CarSearch = ({ category, setCategory, handleSearch }) => {
  return (
    <div className="select-wrapper">
      <span className="select-label">Select Category:</span>
      <select
        className="select-element"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Cars">Cars</option>
        <option value="Trucks">Trucks</option>
        <option value="sports">Sports</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CarSearch;
