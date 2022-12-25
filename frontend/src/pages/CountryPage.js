import React from "react";
import CountryCases from "../components/CountryCases";
import CaseChart from "../components/CaseChart";
import LoadingModal from "../components/LoadingModal";
import CaseCard from "../components/CaseCard";

const CountryPage = () => {
  return (
    <>
      <CountryCases />
      <CaseCard type="country" />
      <CaseChart type="country" />
      <LoadingModal />
    </>
  );
};

export default CountryPage;
