import React from "react";
import CaseCard from "../components/CaseCard";
import CaseChart from "../components/CaseChart.js";
import LoadingModal from "../components/LoadingModal";
import ChartSelector from "../components/ChartSelector";
import Banner from "../components/Banner";
import moment from "moment";

const WorldPage = () => {
  return (
    <>
      <Banner
        message={`World cases are calculated from June 25th 2021 until ${moment().format(
          "MMMM Do YYYY"
        )}`}
        color="warning"
      />
      <CaseCard type="global" />
      <ChartSelector />
      <CaseChart type="global" />
      <LoadingModal />
    </>
  );
};

export default WorldPage;
