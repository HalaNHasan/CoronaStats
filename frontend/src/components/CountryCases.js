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
          .then(async (res) => {
            if (res.data) {
              dispatch(
                setSelectedCountryStats({ selectedCountryStats: res.data })
              );

              dispatch(setModal({ isLoading: false }));
              //to set recovered cases by country:
              if (new Date(endDate) > new Date("2021-08-04")) {
                await getTotalRecoveredCases();
              } else {
                dispatch(
                  setSelectedCountryStats({
                    totalRecovered: res.data[res.data.length - 1].Recovered,
                    lastRecordedRecovered:
                      res.data[res.data.length - 1]["Date"],
                  })
                );
              }
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

        //since the API doesn't return recovered cases after 5/8/2021; it will be added by fetching
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
  //a function to get total recovered cases by country since it's not correctly returned by the API after 2021-08-04
  const getTotalRecoveredCases = async () => {
    await axios
      .get(
        `https://api.covid19api.com/country/${country
          .toLowerCase()
          .toLowerCase()}?from=2021-08-03T00:00:00Z&to=2021-08-04T00:00:00Z`
      )
      .then((res) => {
        if (res.data) {
          dispatch(
            setSelectedCountryStats({
              totalRecovered: res.data[1].Recovered,
            })
          );
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
      dispatch(
        setSelectedCountryStats({
          selectedCountryStats: [],
          totalRecovered: 0,
          lastRecordedRecovered: 0,
        })
      );
      setStartDate("");
      setEndDate("");
    }
  }, []);
  return (
    <div
      className="mt-3  d-flex justify-content-between align-items-center my-auto mx-5 rounded-2"
      style={{ backgroundColor: "rgb(255, 193, 7, 0.5)" }}
    >
      <Container className="mt-3">
        <Row>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center w-100">
              <Dropdown className="w-100" key={1}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="w-100"
                  style={{
                    backgroundColor: "#fff",
                  }}
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
            <Form.Group className="mb-3 d-flex align-items-center w-100">
              <Form.Control
                key={2}
                min={"2020-01-22"}
                max={maxDate}
                type="text"
                placeholder="Start date..."
                className="fw-bold text-center"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 d-flex align-items-center w-100">
              <Form.Control
                key={3}
                min={"2020-01-22"}
                max={maxDate}
                type="text"
                placeholder="End date..."
                className="fw-bold text-center"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="mb-3 d-flex align-items-center w-100 ">
              <Button
                variant="dark"
                className="w-50 mx-auto"
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
