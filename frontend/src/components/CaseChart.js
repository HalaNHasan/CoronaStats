import React from "react";
import { useSelector } from "react-redux";
import { caseChartSelector } from "../redux/selectors";
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
const CaseChart = () => {
  const casesChart = useSelector(caseChartSelector);
  // options.plugins.title.text = "test";
  const labels = casesChart.x;
  const data = {
    labels,
    datasets: [
      {
        label: "Total Cases",
        data: casesChart.yCases,
        backgroundColor: "rgba(53, 162, 230, 0.8)",
      },
    ],
  };
  return (
    <div className="mt-5">
      <Bar options={options} data={data} width="100%" height="20%" />
    </div>
  );
};

export default CaseChart;
