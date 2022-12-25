import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    isLoading: false,
    modalMessage: "",
    allStats: [],
    globalTotalStats: {},
    globalAllStats: [],
    filteredCountries: [],
    firstIndex: 0,
    lastIndex: 11,
    //to set global chart type :daily or monthly
    globalChartType: "daily",
    //to store total recovered cases by country since it's not correctly returned by the API
    countryAllCases: {
      selectedCountryStats: [],
      TotalRecovered: 0,
      TotalConfirmed: 0,
      TotalDeaths: 0,
      lastRecordedCases: "",
      lastRecordedRecovered: "2021-08-04",
    },
  },
  reducers: {
    setAllStats: (state, action) => {
      // action:{payload:{allData}}
      state.allStats = action.payload.allData.Countries || state.allStats;
      state.globalTotalStats =
        action.payload.allData.Global || state.globalTotalStats;
      state.filteredCountries = action.payload.allData?.Countries?.slice(0, 11);
    },
    setGlobalStats: (state, action) => {
      // action:{payload:globalAllStats}
      state.globalAllStats = action.payload || state.globalAllStats;
      //to get total recovered cases;since it's not given by the API!
      state.globalTotalStats.TotalRecovered = [...state.globalAllStats]?.reduce(
        (accumulator, stat) => {
          return accumulator + stat.NewRecovered;
        },
        0
      );
    },
    setModal: (state, action) => {
      // action:{payload:{isLoading:true or false,modalMessage:"message to the user"}}
      //to show/unshow LoadingModal component
      state.isLoading = action.payload.isLoading;
      state.modalMessage = action.payload.modalMessage;
    },

    setFilteredCountries: (state, action) => {
      // action:{payload:{stringContainsCountry}}
      if (action.payload) {
        state.filteredCountries = state.allStats.filter((country) => {
          return country.Country.toLowerCase().includes(
            action.payload.toLowerCase()
          );
        });
      } else {
        state.filteredCountries = [...state.allStats].slice(0, 11);
      }
    },
    sortCountries: (state, action) => {
      // action:{payload:{type:totalConfirmed or newConfirmed or totalDeaths or newDeaths,direction:up or down}}
      if (action.payload.type == "totalConfirmed") {
        state.filteredCountries =
          action.payload.direction == "down"
            ? state.filteredCountries.sort((a, b) => {
                return b.TotalConfirmed - a.TotalConfirmed;
              })
            : state.filteredCountries.sort((a, b) => {
                return a.TotalConfirmed - b.TotalConfirmed;
              });
      } else if (action.payload.type == "newConfirmed") {
        state.filteredCountries =
          action.payload.direction == "down"
            ? state.filteredCountries.sort((a, b) => {
                return b.NewConfirmed - a.NewConfirmed;
              })
            : state.filteredCountries.sort((a, b) => {
                return a.NewConfirmed - b.NewConfirmed;
              });
      } else if (action.payload.type == "totalDeaths") {
        state.filteredCountries =
          action.payload.direction == "down"
            ? state.filteredCountries.sort((a, b) => {
                return b.TotalDeaths - a.TotalDeaths;
              })
            : state.filteredCountries.sort((a, b) => {
                return a.TotalDeaths - b.TotalDeaths;
              });
      } else if (action.payload.type == "newDeaths") {
        state.filteredCountries =
          action.payload.direction == "down"
            ? state.filteredCountries.sort((a, b) => {
                return b.NewDeaths - a.NewDeaths;
              })
            : state.filteredCountries.sort((a, b) => {
                return a.NewDeaths - b.NewDeaths;
              });
      }
    },
    setSelectedCountryStats: (state, action) => {
      // action:{payload:{selectedCountryStats,totalRecovered,lastRecordedRecovered}}
      state.countryAllCases.selectedCountryStats =
        action.payload.selectedCountryStats ||
        state.countryAllCases.selectedCountryStats;

      state.countryAllCases.lastRecordedRecovered =
        action.payload.lastRecordedRecovered ||
        state.countryAllCases.lastRecordedRecovered;

      state.countryAllCases.lastRecordedCases =
        action.payload.selectedCountryStats?.length > 0
          ? action.payload.selectedCountryStats[
              action.payload.selectedCountryStats.length - 1
            ]["Date"]
          : state.countryAllCases.lastRecordedCases;

      state.countryAllCases.TotalRecovered = action.payload.totalRecovered;

      state.countryAllCases.TotalDeaths =
        action.payload.selectedCountryStats?.length > 0
          ? action.payload.selectedCountryStats[
              action.payload.selectedCountryStats.length - 1
            ].Deaths
          : state.countryAllCases.TotalDeaths;

      state.countryAllCases.TotalConfirmed =
        action.payload.selectedCountryStats?.length > 0
          ? action.payload.selectedCountryStats[
              action.payload.selectedCountryStats?.length - 1
            ].Confirmed
          : state.countryAllCases.TotalConfirmed;
    },
    setNextPage: (state) => {
      state.firstIndex = state.firstIndex + 11 > 0 ? state.firstIndex + 11 : 0;
      state.lastIndex = state.lastIndex + 11 > 197 ? 197 : state.lastIndex + 11;
      state.filteredCountries = [...state.allStats].slice(
        state.firstIndex,
        state.lastIndex
      );
    },
    setPrevPage: (state) => {
      state.firstIndex = state.firstIndex - 11 > 0 ? state.firstIndex - 11 : 0;
      state.lastIndex =
        state.lastIndex - 11 >= 197 ? 197 : state.lastIndex - 11;
      state.filteredCountries = [...state.allStats].slice(
        state.firstIndex,
        state.lastIndex
      );
    },
    resetPagination: (state) => {
      state.firstIndex = 0;
      state.lastIndex = 11;
      state.filteredCountries = [...state.allStats].slice(
        state.firstIndex,
        state.lastIndex
      );
    },
    setGlobalChartType: (state, action) => {
      // action:{payload:daily or monthly}
      state.globalChartType = action.payload || state.globalChartType;
    },
    resetFilteredCountries: (state) => {
      state.filteredCountries = state.allStats;
    },
  },
});

export const {
  setModal,
  setAllStats,
  setFilteredCountries,
  sortCountries,
  setGlobalStats,
  setSelectedCountryStats,
  setNextPage,
  setPrevPage,
  resetPagination,
  setGlobalChartType,
  resetFilteredCountries,
} = statsSlice.actions;
export default statsSlice.reducer;
