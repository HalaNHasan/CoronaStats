import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    isLoading: false,
    message: "",
    allStats: [],
    globalStats: {},
    filteredCountries: [],
  },
  reducers: {
    setAllStats: (state, action) => {
      // action:{payload:{allData}}
      console.log("from setAllStats reducer", action.payload.allData.Countries);
      state.allStats = action.payload.allData.Countries || state.allStats;
      state.globalStats = action.payload.allData.Global || state.globalStats;
      state.filteredCountries = action.payload.allData.Countries;
    },
    setIsLoading: (state, action) => {
      // action:{payload:{isLoading:true or false,message:"message to the user"}}
      //to show/unshow LoadingMessage component
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },

    setFilteredCountries: (state, action) => {
      // action:{payload:{stringContainsCountry}}
      console.log("from setFilteredCountriesreducer", action.payload);
      if (action.payload) {
        state.filteredCountries = state.allStats.filter((country) => {
          return country.Country.toLowerCase().includes(
            action.payload.toLowerCase()
          );
        });
      } else {
        state.filteredCountries = state.allStats;
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
  },
});

export const {
  setIsLoading,
  setAllStats,
  setFilteredCountries,
  sortCountries,
} = statsSlice.actions;
export default statsSlice.reducer;
