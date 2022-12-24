import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const LoadingModal = () => {
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: state.stats.isLoading,
    };
  });
  console.log("from modalLoading: ", isLoading);
  return (
    <Modal centered show={isLoading} size="sm">
      <Modal.Body className="d-flex flex-column align-items-center">
        <p>
          <b>Please Wait...</b>
        </p>
        <Spinner animation="border" role="status"></Spinner>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
