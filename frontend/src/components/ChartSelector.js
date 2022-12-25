import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { setGlobalChartType } from "../redux/reducers";
const ChartSelector = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalChartType("daily"));
  }, []);
  return (
    <Tab.Container defaultActiveKey="first">
      <Row className="m-3">
        <Col sm={3} lg={12}>
          <Nav
            variant="pills"
            className="d-flex justify-content-center align-items-center"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="first"
                onClick={() => {
                  dispatch(setGlobalChartType("daily"));
                }}
              >
                Daily
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="second"
                onClick={() => {
                  dispatch(setGlobalChartType("monthly"));
                }}
              >
                Monthly
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ChartSelector;
