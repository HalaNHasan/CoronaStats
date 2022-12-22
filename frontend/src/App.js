import "./App.css";
import { Routes, Route } from "react-router-dom";
import WorldPage from "./pages/WorldPage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<WorldPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:country" element={<CountryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
