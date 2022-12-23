import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch } from "react-redux";
import { setFilteredCountries } from "../redux/reducers";

const FilterBox = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  useEffect(() => {
    //to reset filteredCountries with each render
    if (!country) {
      dispatch(setFilteredCountries(""));
    }
  }, []);
  return (
    <div className="m-3 d-flex justify-content-center">
      <FloatingLabel controlId="floatingInput" label="Country" className="mb-3">
        <Form.Control
          placeholder="Country"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            dispatch(setFilteredCountries(e.target.value));
            setCountry(e.target.value);
          }}
        />
      </FloatingLabel>
    </div>
  );
};

export default FilterBox;
