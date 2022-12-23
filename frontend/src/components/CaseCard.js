import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaDisease } from "react-icons/fa";
import { GiTombstone, GiZigzagLeaf } from "react-icons/gi";

const CaseCard = ({ totals }) => {
  //states stored in redux
  const { globalTotalStats } = useSelector((state) => {
    return {
      globalTotalStats: state.stats.globalTotalStats,
    };
  });
  // console.log(globalTotalStats);
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        {/* confirmed card-start */}
        <Col>
          <Card
            style={{ width: "12rem" }}
            className="bg-dark text-warning border-0 flex-col align-items-center text-center"
          >
            <Card.Body>
              <Card.Title>Total Cases</Card.Title>
              <Card.Subtitle className="mb-2">
                {globalTotalStats.TotalConfirmed}
              </Card.Subtitle>
              <FaDisease
                className="fs-1 text-muted"
                onClick={() => {
                  console.log("hi");
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        {/* confirmed card-end */}
        {/* death card-start */}
        <Col>
          <Card
            style={{ width: "12rem" }}
            className="bg-dark text-warning border-0 flex-col align-items-center text-center"
          >
            <Card.Body>
              <Card.Title>Total Deaths</Card.Title>
              <Card.Subtitle className="mb-2">
                {globalTotalStats.TotalDeaths}
              </Card.Subtitle>
              <GiTombstone
                className="fs-1 text-muted"
                onClick={() => {
                  console.log("hi");
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        {/* death card-end */}

        {/* recovered card-start */}
        <Col>
          <Card
            style={{ width: "12rem" }}
            className="bg-dark text-warning border-0 flex-col align-items-center text-center"
          >
            <Card.Body>
              <Card.Title>Total Recovered</Card.Title>
              <Card.Subtitle className="mb-2">
                {globalTotalStats.TotalRecovered}
              </Card.Subtitle>
              <GiZigzagLeaf
                className="fs-1 text-muted"
                onClick={() => {
                  console.log("hi");
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        {/* recovered card-end */}
      </Row>
    </Container>
  );
};

export default CaseCard;
