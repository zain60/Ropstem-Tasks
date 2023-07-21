import React from "react";

const Pagination = ({ cars, currentPage, itemsPerPage, paginate }) => {
  return (
    <div className="pagination">
      {Array.from({ length: Math.ceil(cars.length / itemsPerPage) }, (_, i) => (
        <button key={i} onClick={() => paginate(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
