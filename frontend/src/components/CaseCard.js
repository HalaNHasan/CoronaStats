import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaDisease } from "react-icons/fa";
import { GiTombstone, GiZigzagLeaf } from "react-icons/gi";
import moment from "moment";

const CaseCard = ({ type }) => {
  let totalStats, lastRecordedCases, lastRecordedRecovered;
  let showCards = true;
  const { globalTotalStats, countryAllCases } = useSelector((state) => {
    return {
      globalTotalStats: state.stats.globalTotalStats,
      countryAllCases: state.stats.countryAllCases,
    };
  });
  if (type == "global") {
    totalStats = globalTotalStats;
    lastRecordedCases = moment().format("MMMM Do YYYY");
    lastRecordedRecovered = moment("2021-08-04").format("MMMM Do YYYY");
  } else if (
    type == "country" &&
    countryAllCases.selectedCountryStats?.length > 0
  ) {
    totalStats = countryAllCases;
    lastRecordedCases = moment(countryAllCases.lastRecordedCases).format(
      "MMMM Do YYYY"
    );
    lastRecordedRecovered = moment(
      countryAllCases.lastRecordedRecovered
    ).format("MMMM Do YYYY");
  } else {
    showCards = false;
  }
  return (
    <>
      {showCards ? (
        <Container>
          <Row className="mt-4 d-flex flex-sm-column flex-lg-row justify-content-between align-items-center w-100 mx-auto g-2">
            {/* confirmed card-start */}
            <Col sm={12} lg={3}>
              <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
                <Card.Body>
                  <Card.Title>Total Cases</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Recorded: {lastRecordedCases}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2">
                    {totalStats?.TotalConfirmed?.toLocaleString("en-US")}
                  </Card.Subtitle>
                  <FaDisease className="fs-1 text-muted" />
                </Card.Body>
              </Card>
            </Col>
            {/* confirmed card-end */}
            {/* death card-start */}
            <Col sm={12} lg={3}>
              <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
                <Card.Body>
                  <Card.Title>Total Deaths</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Recorded:{lastRecordedCases}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2">
                    {totalStats?.TotalDeaths?.toLocaleString("en-US")}
                  </Card.Subtitle>
                  <GiTombstone className="fs-1 text-muted" />
                </Card.Body>
              </Card>
            </Col>
            {/* death card-end */}

            {/* recovered card-start */}
            <Col sm={12} lg={3}>
              <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
                <Card.Body>
                  <Card.Title>Total Recovered</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Recorded: {lastRecordedRecovered}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2">
                    {totalStats?.TotalRecovered?.toLocaleString("en-US")}
                  </Card.Subtitle>
                  <GiZigzagLeaf className="fs-1 text-muted" />
                </Card.Body>
              </Card>
            </Col>
            {/* recovered card-end */}
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default CaseCard;
