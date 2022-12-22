import React from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setFilteredCountries } from "../redux/reducers";

const FilterBox = () => {
  const dispatch = useDispatch();

  return (
    <div className="m-3 d-flex justify-content-center">
      <Form.Control
        placeholder="Country..."
        aria-label="Country..."
        aria-describedby="basic-addon2"
        onChange={(e) => {
          dispatch(setFilteredCountries(e.target.value));
        }}
      />
    </div>
  );
};

export default FilterBox;
