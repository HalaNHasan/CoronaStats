import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-light my-auto w-100 mx-auto text-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", minHeight: "93vh" }}
    >
      <h1>404</h1>
      <h3>Sorry, the page cannot be found!</h3>
      <Button
        variant="btn btn-primary btn-lg"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default Error;
