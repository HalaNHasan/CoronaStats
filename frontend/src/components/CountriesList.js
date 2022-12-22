import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { sortCountries } from "../redux/reducers";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GiTombstone, GiZigzagLeaf } from "react-icons/gi";
const CountriesList = () => {
  const dispatch = useDispatch();
  //dispatch(sortCountries({type:totalConfirmed or newConfirmed or totalDeaths or newDeaths,direction:up or down}))
  const { filteredCountries } = useSelector((state) => {
    return {
      filteredCountries: state.stats.filteredCountries,
    };
  });
  console.log(filteredCountries);
  useEffect(() => {}, []);

  return (
    <div className="mt-3">
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Country</th>
              <th>
                Total Confirmed
                <div>
                  <FaArrowUp
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
                  <FaArrowDown
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
              </th>
              <th>
                New Confirmed
                <div>
                  <FaArrowUp
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
                  <FaArrowDown
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
              </th>
              <th>
                Total Deaths
                <div>
                  <FaArrowUp
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
                  <FaArrowDown
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
              </th>
              <th>
                New Deaths
                <div>
                  <FaArrowUp
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
                  <FaArrowDown
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
      </Container>
    </div>
  );
};

export default CountriesList;
//!sorting arrows,table scroll,filter reset after navigating other page
//! add label to indicate dates
