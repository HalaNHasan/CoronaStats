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
  return (
    <Container>
      <Row className="mt-4 d-flex justify-content-between align-items-center w-100">
        {/* confirmed card-start */}
        <Col sm={12} lg={4}>
          <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
            <Card.Body>
              <Card.Title>Total Cases</Card.Title>
              <Card.Subtitle className="mb-2">
                {globalTotalStats.TotalConfirmed}
              </Card.Subtitle>
              <FaDisease className="fs-1 text-muted" />
            </Card.Body>
          </Card>
        </Col>
        {/* confirmed card-end */}
        {/* death card-start */}
        <Col sm={12} lg={4}>
          <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
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
        <Col sm={12} lg={4}>
          <Card className="bg-dark text-warning border-0 flex-col align-items-center text-center">
            <Card.Body>
              <Card.Title>Total Recovered</Card.Title>
              <Card.Subtitle className="mb-2">
                {globalTotalStats.TotalRecovered}
              </Card.Subtitle>
              <GiZigzagLeaf className="fs-1 text-muted" />
            </Card.Body>
          </Card>
        </Col>
        {/* recovered card-end */}
      </Row>
    </Container>
  );
};

export default CaseCard;
