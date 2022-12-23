import React from "react";
import { useParams } from "react-router-dom";
import CountryCases from "../components/CountryCases";
import CaseChart from "../components/CaseChart";

const CountryPage = () => {
  return (
    <>
      <CountryCases />
      <CaseChart type="country" />
    </>
  );
};

export default CountryPage;
