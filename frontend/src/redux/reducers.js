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
  },
});

export const { setIsLoading, setAllStats, setFilteredCountries } =
  statsSlice.actions;
export default statsSlice.reducer;
