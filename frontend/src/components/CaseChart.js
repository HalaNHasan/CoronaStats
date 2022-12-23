import React from "react";
import { useSelector } from "react-redux";
import { caseChartSelector } from "../redux/selectors";
import Chart from "react-apexcharts";

const CaseChart = () => {
  const casesChart = useSelector(caseChartSelector);
  console.log(casesChart);
  let options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: casesChart.x,
    },
  };
  let series = [
    {
      name: "total confirmed cases",
      data: casesChart.y,
    },
  ];
  return (
    <div>
      <Chart type="bar" options={options} series={series} width="70%" />
    </div>
  );
};

export default CaseChart;
