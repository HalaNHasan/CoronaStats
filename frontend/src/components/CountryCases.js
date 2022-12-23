import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setSelectedCountryStats } from "../redux/reducers";

const CountryCases = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");

  //to prevent the user from picking dates in the future:
  let maxDate = moment().format("YYYY-MM-DD");

  const fetchCountryStats = async () => {
    //to fetch stats for a specific country for a specific time-period:
    if (country && startDate && endDate) {
      await axios
        .get(
          `https://api.covid19api.com/country/${country}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
        )
        .then((res) => {
          console.log(res.data); //!result will be rendered in charts
          dispatch(setSelectedCountryStats(res.data));
        })
        .catch((error) => {
          //an error message to be displayed for the user later...
          console.log(error.message);
        });
    } else {
      //!LoadingMesssage component will be shown telling the user to fill all input fields
      console.log("all fields must be filled");
    }
  };
  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Label style={{ width: "5rem" }}>Country</Form.Label>
              <Form.Control
                style={{ width: "10rem" }}
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Label style={{ width: "5rem" }}>From</Form.Label>
              <Form.Control
                min={"2020-01-22"}
                max={maxDate}
                style={{ width: "10rem" }}
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center gap-2">
              <Form.Label style={{ width: "5rem" }}>to</Form.Label>
              <Form.Control
                min={"2020-01-22"}
                max={maxDate}
                style={{ width: "10rem" }}
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className="mb-3 d-flex align-items-center gap-2"
              style={{ width: "75%" }}
            >
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  fetchCountryStats();
                }}
              >
                Go!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CountryCases;
//! limit user input in country field for the suggested countries only
