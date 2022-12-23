import React from "react";
import CaseCard from "../components/CaseCard";
import CaseChart from "../components/CaseChart.js";

const WorldPage = () => {
  return (
    <>
      <CaseCard />
      <CaseChart type="global" />
    </>
  );
};

export default WorldPage;
