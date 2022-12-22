import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./reducers";

export default configureStore({
  reducer: {
    stats: statsReducer,
  },
});
