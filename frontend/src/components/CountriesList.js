import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const CountriesList = () => {
  //states stored in redux:allStats to be rendered & searchedCountry to be filtered for
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
              <th>Total Confirmed</th>
              <th>New Confirmed</th>
              <th>Total Deaths</th>
              <th>New Deaths</th>
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
