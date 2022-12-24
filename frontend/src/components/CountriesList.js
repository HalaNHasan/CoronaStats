import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { sortCountries } from "../redux/reducers";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Banner from "./Banner";

const CountriesList = () => {
  const dispatch = useDispatch();
  //dispatch(sortCountries({type:totalConfirmed or newConfirmed or totalDeaths or newDeaths,direction:up or down}))
  const { filteredCountries } = useSelector((state) => {
    return {
      filteredCountries: state.stats.filteredCountries,
    };
  });
  return (
    <div className="mt-3">
      <Container>
        {filteredCountries?.length != 0 ? (
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="align-middle">Country</th>
                <th>
                  <div className="d-flex justify-content-between">
                    Total Confirmed
                    <div className="d-flex flex-column">
                      <BiUpArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "totalConfirmed",
                              direction: "up",
                            })
                          );
                        }}
                      />
                      <BiDownArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "totalConfirmed",
                              direction: "down",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between">
                    New Confirmed
                    <div className="d-flex flex-column">
                      <BiUpArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "newConfirmed",
                              direction: "up",
                            })
                          );
                        }}
                      />
                      <BiDownArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "newConfirmed",
                              direction: "down",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between">
                    Total Deaths
                    <div className="d-flex flex-column">
                      <BiUpArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "totalDeaths",
                              direction: "up",
                            })
                          );
                        }}
                      />
                      <BiDownArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "totalDeaths",
                              direction: "down",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between">
                    New Deaths
                    <div className="d-flex flex-column">
                      <BiUpArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "newDeaths",
                              direction: "up",
                            })
                          );
                        }}
                      />
                      <BiDownArrow
                        role="button"
                        onClick={() => {
                          dispatch(
                            sortCountries({
                              type: "newDeaths",
                              direction: "down",
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries &&
                filteredCountries.map((country, ind) => {
                  return (
                    <tr key={country.ID}>
                      <td>{country.Country}</td>
                      <td>{country.TotalConfirmed}</td>
                      <td>{country.NewConfirmed}</td>
                      <td>{country.TotalDeaths}</td>
                      <td>{country.NewDeaths}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <Banner message="No countries match your input!" />
        )}
      </Container>
    </div>
  );
};

export default CountriesList;
//! add label to indicate dates
