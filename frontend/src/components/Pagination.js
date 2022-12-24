import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPage, setPrevPage, resetPagination } from "../redux/reducers";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Pagination = () => {
  const dispatch = useDispatch();

  const { firstIndex, lastIndex } = useSelector((state) => {
    return {
      firstIndex: state.stats.firstIndex,
      lastIndex: state.stats.lastIndex,
    };
  });

  useEffect(() => {
    dispatch(resetPagination());
  }, []);
  return (
    <div
      className="d-flex justify-content-between align-items-center flex-wrap w-100"
      style={{ position: "relative" }}
    >
      {firstIndex > 0 ? (
        <BsFillArrowLeftCircleFill
          style={{
            position: "absolute",
            top: "-9vh",
            left: "0.5vw",
            fontSize: "2.5rem",
            paddingLeft: "0.5rem",
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
            top: "-10vh",
            right: "0.5vw",
            fontSize: "2.5rem",
            paddingRight: "0.5rem",
          }}
          role="button"
          onClick={async () => {
            dispatch(setNextPage());
          }}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
