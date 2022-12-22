import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import WorldPage from "./pages/WorldPage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import { setAllStats } from "./redux/reducers";

function App() {
  const dispatch = useDispatch();
  //to fetch all stats upon loading the app
  const fetchAllStats = async () => {
    //to fetch stats summary for all countries up-to-date:
    await axios
      .get("https://api.covid19api.com/summary")
      .then((res) => {
        console.log(res.data);
        //to save allStats to redux store
        dispatch(setAllStats({ allData: res.data }));
      })
      .catch((error) => {
        //an error message to be displayed for the user later...
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAllStats();
  });

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WorldPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:country" element={<CountryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
