import React from "react";

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
