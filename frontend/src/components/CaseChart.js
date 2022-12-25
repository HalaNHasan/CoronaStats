import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  globalChartSelectorByDay,
  globalChartSelectorByMonth,
  countryChartSelector,
} from "../redux/selectors";
import { options } from "./Chart.config.js";
import Banner from "./Banner";

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
  const dispatch = useDispatch();
  // const [casesChart, setCaseChart] = useState({});
  let casesChart;
  const globalStatsByMonth = useSelector(globalChartSelectorByMonth);
  const globalStatsByDay = useSelector(globalChartSelectorByDay);
  const countryStats = useSelector(countryChartSelector);
  const { globalChartType } = useSelector((state) => {
    return {
      globalChartType: state.stats.globalChartType,
    };
  });

  //
  if (type == "global" && globalChartType == "daily") {
    casesChart = globalStatsByDay;
  } else if (type == "global" && globalChartType == "monthly") {
    casesChart = globalStatsByMonth;
  } else {
    casesChart = countryStats;
  }
  // console.log("from case chart", globalChartType, type);
  // console.log("casesChart", casesChart);
  //for the first chart-cases
  const totalCasesData = {
    labels: casesChart.x,
    datasets: [
      {
        label: "Total Cases",
        data: casesChart.yCases,
        backgroundColor: "rgba(105,105,105, 0.8)",
      },
    ],
  };

  //for the second chart-deaths
  const totalDeathsData = {
    labels: casesChart.x,
    datasets: [
      {
        label: "Total Deaths",
        data: casesChart.yDeaths,
        backgroundColor: "rgba(255,69,0, 0.7)",
      },
    ],
  };

  return (
    <div className="m-5 flex-col">
      {type == "country" && !casesChart?.yCases?.length ? (
        <Banner message="Please Select Country & Dates!" />
      ) : (
        <>
          <Bar
            options={options}
            data={totalCasesData}
            width="100%"
            height="20%"
          />
          <Bar
            options={options}
            data={totalDeathsData}
            width="100%"
            height="20%"
          />
        </>
      )}
    </div>
  );
};

export default CaseChart;
