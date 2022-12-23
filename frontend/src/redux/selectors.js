//this file is to sort and filter cases to be represented graphically by Chart component:
import { createSelector } from "reselect";
//to interact with redux store:
import { get } from "lodash";

//fetched from redux store...
const globalAllStats = (state) => get(state, "stats.globalAllStats");

//-------------------------------------------------
//! chart selector/to build column chart
export const caseChartSelector = createSelector(globalAllStats, (stats) => {
  //to prevent app crash if globalAllStats is not loaded yet
  if (!stats) {
    return;
  }

  //sort stats by date
  stats = [...stats]?.sort((a, b) => {
    return new Date(a["Date"]) - new Date(b["Date"]);
  });

  //format date to yy-mm-dd
  //   stats = [...stats]?.map((stat) => {
  //     return { ...stat, Date: stat["Date"].split("T")[0] };
  //   });
  //to represent dates on the X-axis
  let Xaxis = [...stats]?.map((stat) => {
    return stat["Date"].split("T")[0];
  });

  //to represent total confirmed cases on the Y-axis
  let totalConfirmed_Yaxis = [...stats]?.map((stat) => {
    return stat.TotalConfirmed;
  });
  //to represent total deaths on the Y-axis
  let totalDeaths_Yaxis = [...stats]?.map((stat) => {
    return stat.TotalDeaths;
  });

  //   for (const key of totalDeaths_Yaxis) {
  //     console.log(key);
  //   }

  console.log(Xaxis);
  //   return {
  //     x: Xaxis,
  //     y: totalConfirmed_Yaxis,
  //   };

  return {
    x: Xaxis,
    y: totalConfirmed_Yaxis,
  };
});

//-------------------------------------------------
