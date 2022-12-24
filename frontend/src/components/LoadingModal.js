import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { setModal } from "../redux/reducers";

const LoadingModal = () => {
  //to close modal box and reset message:
  const dispatch = useDispatch();

  const { isLoading, modalMessage } = useSelector((state) => {
    return {
      isLoading: state.stats.isLoading,
      modalMessage: state.stats.modalMessage,
    };
  });
  return (
    <Modal centered show={isLoading} size="sm">
      <Modal.Body className="d-flex flex-column align-items-center text-center">
        {modalMessage ? (
          <p>
            <b> {modalMessage} </b>
          </p>
        ) : (
          <p>
            <b> Please Wait...</b>
          </p>
        )}

        {modalMessage ? (
          <Button
            variant="danger"
            className="w-30"
            onClick={() => {
              dispatch(setModal({ isLoading: false, modalMessage: "" }));
            }}
          >
            Back
          </Button>
        ) : (
          <Spinner animation="border" role="status"></Spinner>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
