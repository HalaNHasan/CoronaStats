import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { globalChartSelector, countryChartSelector } from "../redux/selectors";
import { options } from "./Chart.config.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const CaseChart = ({ type }) => {
  let casesChart;
  const globalStats = useSelector(globalChartSelector);
  const countryStats = useSelector(countryChartSelector);
  if (type == "global") {
    casesChart = globalStats;
  } else {
    casesChart = countryStats;
  }
  // options.plugins.title.text = "test";
  console.log("from case chart", casesChart);
  //for the first chart
  const totalCasesData = {
    labels: casesChart.x,
    datasets: [
      {
        label: "Total Cases",
        data: casesChart.yCases,
        backgroundColor: "rgba(53, 162, 230, 0.8)",
      },
    ],
  };

  //for the second chart
  const totalDeathsData = {
    labels: casesChart.x,
    datasets: [
      {
        label: "Total Deaths",
        data: casesChart.yDeaths,
        backgroundColor: "rgba(53, 162, 230, 0.8)",
      },
    ],
  };
  useEffect(() => {
    if (type == "global") {
      casesChart = globalStats;
    } else {
      casesChart = countryStats;
    }
  }, []);
  return (
    <div className="mt-5">
      <Bar options={options} data={totalCasesData} width="100%" height="20%" />
      <Bar options={options} data={totalDeathsData} width="100%" height="20%" />
    </div>
  );
};

export default CaseChart;
