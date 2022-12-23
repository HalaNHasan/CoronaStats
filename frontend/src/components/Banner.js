import React from "react";

//to show messages to the user if charts/lists are not rendered/empty
const Banner = ({ message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <h1>{message}</h1>
    </div>
  );
};

export default Banner;
