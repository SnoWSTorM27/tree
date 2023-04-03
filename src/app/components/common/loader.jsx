import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center m-4">
      <strong className="text-danger">Loading</strong>
      <div
        className="spinner-border text-danger spinner-grow-sm"
        role="status"
      ></div>
    </div>
  );
}

export default Loader;
