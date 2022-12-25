import React from "react";
import FilterBox from "../components/FilterBox";
import CountriesList from "../components/CountriesList";
import Pagination from "../components/Pagination";
import CountriesRank from "../components/CountriesRank";

const CountriesPage = () => {
  return (
    <>
      <FilterBox />
      <CountriesRank />
      <CountriesList />
      <Pagination />
    </>
  );
};

export default CountriesPage;
