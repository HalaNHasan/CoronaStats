import React from "react";
import CaseCard from "../components/CaseCard";
import CaseChart from "../components/CaseChart.js";
import LoadingModal from "../components/LoadingModal";
import ChartSelector from "../components/ChartSelector";

const WorldPage = () => {
  return (
    <>
      <CaseCard type="global" />
      <ChartSelector />
      <CaseChart type="global" />
      <LoadingModal />
    </>
  );
};

export default WorldPage;
