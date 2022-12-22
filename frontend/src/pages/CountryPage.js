import React from "react";
import { useParams } from "react-router-dom";
import CountryCases from "../components/CountryCases";

const CountryPage = () => {
  const { country } = useParams();
  console.log(country);

  return (
    <>
      <CountryCases />
    </>
  );
};

export default CountryPage;
