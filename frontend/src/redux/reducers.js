import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    isLoading: false,
    message: "",
    allStats: [],
    globalStats: {},
  },
  reducers: {
    setAllStats: (state, action) => {
      // action:{payload:{allData}}
      console.log("from setAllStats reducer", action.payload.allData.Countries);
      state.allStats = action.payload.allData.Countries || state.allStats;
      state.globalStats = action.payload.allData.Global || state.globalStats;
    },
    setIsLoading: (state, action) => {
      // action:{payload:{isLoading:true or false,message:"message to the user"}}
      //to show/unshow LoadingMessage component
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
  },
});

export const { setIsLoading, setAllStats } = statsSlice.actions;
export default statsSlice.reducer;
