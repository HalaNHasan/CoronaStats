import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPage, setPrevPage, resetPagination } from "../redux/reducers";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Pagination = () => {
  const dispatch = useDispatch();

  const { firstIndex, lastIndex, filteredCountries } = useSelector((state) => {
    return {
      firstIndex: state.stats.firstIndex,
      lastIndex: state.stats.lastIndex,
      filteredCountries: state.stats.filteredCountries,
    };
  });

  useEffect(() => {
    dispatch(resetPagination());
  }, []);
  return (
    <>
      {filteredCountries.length < 12 ? (
        <div
          className="d-flex justify-content-between align-items-center flex-wrap w-100"
          style={{ position: "relative" }}
        >
          {firstIndex > 0 ? (
            <BsFillArrowLeftCircleFill
              style={{
                position: "absolute",
                bottom: "-4vh",
                left: "40vw",
                fontSize: "2.5rem",
                paddingLeft: "0.5rem",

                marginRight: "3rem",
              }}
              role="button"
              onClick={async () => {
                dispatch(setPrevPage());
              }}
            />
          ) : null}
          {lastIndex < 197 ? (
            <BsFillArrowRightCircleFill
              style={{
                position: "absolute",
                bottom: "-4vh",
                right: "40vw",
                fontSize: "2.5rem",
                marginLeft: "3rem",
                paddingRight: "0.5rem",
              }}
              role="button"
              onClick={async () => {
                dispatch(setNextPage());
              }}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
