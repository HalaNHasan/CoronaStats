//this file is to sort and filter cases to be represented graphically by Chart component:
import { createSelector } from "reselect";
//to interact with redux store:
import { get, groupBy } from "lodash";
import moment from "moment";

//fetched from redux store...
const globalAllStats = (state) => get(state, "stats.globalAllStats");
const selectedCountryStats = (state) =>
  get(state, "stats.countryAllCases.selectedCountryStats");
const allStats = (state) => get(state, "stats.allStats");
//-------------------------------------------------
//! chart selector for global stats by day/to build column chart
export const globalChartSelectorByDay = createSelector(
  globalAllStats,
  (stats) => {
    //to prevent app crash if globalAllStats is not loaded yet
    if (!stats) {
      return;
    }

    //sort stats by date
    stats = [...stats]?.sort((a, b) => {
      return new Date(a["Date"]) - new Date(b["Date"]);
    });
    //! to draw charts of the globe stats by days:
    //to represent dates on the X-axis
    let Xaxis_ByDay = [...stats]?.map((stat) => {
      return stat["Date"].split("T")[0];
    });

    //to represent total confirmed cases by day on the Y-axis
    let totalConfirmedByDay_Yaxis = [...stats]?.map((stat) => {
      return stat.TotalConfirmed;
    });
    //to represent total deaths by day on the Y-axis
    let totalDeathsByDay_Yaxis = [...stats]?.map((stat) => {
      return stat.TotalDeaths;
    });

    return {
      x: Xaxis_ByDay,
      yCases: totalConfirmedByDay_Yaxis,
      yDeaths: totalDeathsByDay_Yaxis,
    };
  }
);
//-------------------------------------------------
//! chart selector for global stats by month/to build column chart
export const globalChartSelectorByMonth = createSelector(
  globalAllStats,
  (stats) => {
    //to prevent app crash if globalAllStats is not loaded yet
    if (!stats) {
      return;
    }

    //sort stats by date
    stats = [...stats]?.sort((a, b) => {
      return new Date(a["Date"]) - new Date(b["Date"]);
    });

    //group cases by months:
    let totalByMonth = groupBy(stats, (stat) => {
      return moment(stat["Date"]).startOf("month").format("YYYY/MM");
    }); //totalByMonth={month1:[],month2:[]}

    //to represent months on the X-axis
    let Xaxis_ByMonth = Object.keys(totalByMonth);

    //to represent total confirmed cases by month on the Y-axis
    let totalConfirmedByMonth_Yaxis = Object.values(totalByMonth).map(
      (stat) => {
        return [...stat]?.reduce((accumulator, stat2) => {
          return accumulator + stat2.TotalConfirmed;
        }, 0);
      }
    );

    //to represent total deaths by month on the Y-axis
    let totalDeathsByMonth_Yaxis = Object.values(totalByMonth).map((stat) => {
      return [...stat]?.reduce((accumulator, stat2) => {
        return accumulator + stat2.TotalDeaths;
      }, 0);
    });

    return {
      x: Xaxis_ByMonth,
      yCases: totalConfirmedByMonth_Yaxis,
      yDeaths: totalDeathsByMonth_Yaxis,
    };
  }
);
//-------------------------------------------------
//! chart selector for country stats/to build column chart
export const countryChartSelector = createSelector(
  selectedCountryStats,
  (stats) => {
    //to prevent app crash if selectedCountryStats is not loaded yet
    if (!stats) {
      return;
    }

    //to represent dates on the X-axis
    let Xaxis_ByDay = [...stats]?.map((stat) => {
      return stat["Date"].split("T")[0];
    });

    //to represent total confirmed cases by day on the Y-axis
    let totalConfirmedByDay_Yaxis = [...stats]?.map((stat) => {
      return stat.Confirmed;
    });
    //to represent total deaths by day on the Y-axis
    let totalDeathsByDay_Yaxis = [...stats]?.map((stat) => {
      return stat.Deaths;
    });

    return {
      x: Xaxis_ByDay,
      yCases: totalConfirmedByDay_Yaxis,
      yDeaths: totalDeathsByDay_Yaxis,
    };
  }
);
//-------------------------------------------------
//! to extract countries names from allStats stae
export const countriesNamesSelector = createSelector(allStats, (countries) => {
  //to prevent app crash if allStats is not loaded yet
  if (!countries) {
    return;
  }

  //to extract countries names from allStats state
  let countriesNames = [...countries]?.map((country) => {
    return country.Slug[0].toUpperCase() + country.Slug.slice(1);
  });

  return countriesNames;
});
//-------------------------------------------------
