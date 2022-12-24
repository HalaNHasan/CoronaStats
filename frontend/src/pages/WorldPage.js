import React from "react";
import CaseCard from "../components/CaseCard";
import CaseChart from "../components/CaseChart.js";
import LoadingModal from "../components/LoadingModal";

const WorldPage = () => {
  return (
    <>
      <CaseCard />
      <CaseChart type="global" />
      <LoadingModal />
    </>
  );
};

export default WorldPage;
