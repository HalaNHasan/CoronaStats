import React from "react";
import Container from "react-bootstrap/Container";

//to show messages to the user if charts/lists are not rendered/empty
const Banner = ({ message, color }) => {
  return (
    <Container
      className={`mt-2 text-center p-2 text-${color} rounded-2 w-50`}
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
    >
      <h3>{message}</h3>
    </Container>
  );
};

export default Banner;
