import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { setSelectedCountryStats, setModal } from "../redux/reducers";
import { countriesNamesSelector } from "../redux/selectors";

const CountryCases = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const countriesNamesList = useSelector(countriesNamesSelector);

  //to prevent the user from picking dates in the future:
  let maxDate = moment().subtract(2, "days").format("YYYY-MM-DD");

  const fetchCountryStats = async () => {
    //to fetch stats for a specific country for a specific time-period:
    if (country && startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        dispatch(
          setModal({
            isLoading: true,
            modalMessage: "Start date must be less than end date!",
          })
        );
      } else {
        dispatch(setModal({ isLoading: true }));
        await axios
          .get(
            `https://api.covid19api.com/country/${country.toLowerCase()}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
          )
          .then((res) => {
            console.log(res.data);
            dispatch(setSelectedCountryStats(res.data));
            if (res.data) {
              dispatch(setModal({ isLoading: false }));
            }
          })
          .catch((error) => {
            dispatch(
              setModal({
                isLoading: true,
                modalMessage: error.message,
              })
            );
          });
      }
    } else {
      dispatch(
        setModal({
          isLoading: true,
          modalMessage: "All fields must be filled",
        })
      );
    }
  };
  //a component that returns a drop-down country item
  const DropDownItem = ({ country, index }) => {
    return (
      <Dropdown.Item
        key={index}
        onClick={(e) => {
          setCountry(country);
        }}
      >
        {country}
      </Dropdown.Item>
    );
  };
  useEffect(() => {
    //to reset countryStats with each render
    if (!country) {
      dispatch(setSelectedCountryStats([]));
      setStartDate("");
      setEndDate("");
    }
  }, []);
  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center "
          >
            <Form.Group className="mb-3 d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{ width: "16rem" }}
                >
                  {country ? country : "Select Country"}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    height: "360px",
                    overflowY: "auto",
                    width: "215px",
                    overflowX: "hidden",
                  }}
                >
                  {countriesNamesList &&
                    countriesNamesList.map((country, ind) => {
                      return <DropDownItem country={country} index={ind} />;
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center">
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
            <Form.Group className="mb-3 d-flex align-items-center">
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
              className="mb-3 d-flex align-items-center"
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
//! dates should match that given by the stat
