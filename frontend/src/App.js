import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import WorldPage from "./pages/WorldPage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import { setAllStats, setGlobalStats, setIsLoading } from "./redux/reducers";

function App() {
  const dispatch = useDispatch();
  //to fetch all stats upon loading the app
  const fetchAllStats = async () => {
    dispatch(setIsLoading({ isLoading: true }));
    //to fetch stats summary for all countries up-to-date:
    await axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        console.log(res.data);
        //to save allStats to redux store
        dispatch(setAllStats({ allData: res.data }));
        if (res.data.Global.NewConfirmed) {
          dispatch(setIsLoading({ isLoading: false }));
          console.log("hereeeeeeeeee");
        }
      })
      .catch((error) => {
        //an error message to be displayed for the user later...
        console.log(error.message);
      });

    //to fetch globe stats from the beginning up-to-date:
    //! globe data starts from 2021-06-25
    await axios
      .get(
        `https://api.covid19api.com/world?from=2020-01-22T00:00:00Z&to=${moment().format(
          "YYYY-MM-DD"
        )}T00:00:00Z
        `
      )
      .then((res) => {
        dispatch(setGlobalStats(res.data));
      })
      .catch((error) => {
        //an error message to be displayed for the user later...
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WorldPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country" element={<CountryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
