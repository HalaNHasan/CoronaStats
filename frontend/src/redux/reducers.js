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
    selectedCountryStats: [],
    firstIndex: 0,
    lastIndex: 11,
    //to set global chart type :daily or monthly
    globalChartType: "daily",
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
      // action:{payload:selectedCountryStats}
      state.selectedCountryStats = action.payload;
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
      // action:{payload:{firstIndex,lastIndex}}
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
} = statsSlice.actions;
export default statsSlice.reducer;
