import React from "react";
import CountryCases from "../components/CountryCases";
import CaseChart from "../components/CaseChart";
import LoadingModal from "../components/LoadingModal";

const CountryPage = () => {
  return (
    <>
      <CountryCases />
      <CaseChart type="country" />
      <LoadingModal />
    </>
  );
};

export default CountryPage;
