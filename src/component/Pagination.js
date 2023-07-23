import React from "react";

const Pagination = ({ currentPage,paginate ,totalPage}) => {

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      paginate(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
