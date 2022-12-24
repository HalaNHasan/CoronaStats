import React from "react";
import FilterBox from "../components/FilterBox";
import CountriesList from "../components/CountriesList";
import Pagination from "../components/Pagination";

const CountriesPage = () => {
  return (
    <>
      <FilterBox />
      <Pagination />
      <CountriesList />
    </>
  );
};

export default CountriesPage;
