import React from "react";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import {
  sortCountries,
  resetFilteredCountries,
  resetPagination,
} from "../redux/reducers";

const CountriesRank = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Container defaultActiveKey="fifth">
      <Container>
        <Row className="">
          <Col
            sm={12}
            lg={12}
            className="d-flex flex-sm-column flex-lg-row justify-content-between align-items-center text-center"
          >
            <h4>Top Countries by:</h4>
            <Nav
              variant="pills"
              className="d-flex justify-content-center align-items-center"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  onClick={() => {
                    dispatch(resetFilteredCountries());
                    //
                    dispatch(
                      sortCountries({
                        type: "totalConfirmed",
                        direction: "down",
                      })
                    );
                  }}
                >
                  Total Cases
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  onClick={() => {
                    dispatch(resetFilteredCountries());
                    //
                    dispatch(
                      sortCountries({
                        type: "newConfirmed",
                        direction: "down",
                      })
                    );
                  }}
                >
                  New Cases
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="third"
                  onClick={() => {
                    dispatch(resetFilteredCountries());
                    //
                    dispatch(
                      sortCountries({
                        type: "totalDeaths",
                        direction: "down",
                      })
                    );
                  }}
                >
                  Total Deaths
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="fourth"
                  onClick={() => {
                    dispatch(resetFilteredCountries());
                    //
                    dispatch(
                      sortCountries({
                        type: "newDeaths",
                        direction: "down",
                      })
                    );
                  }}
                >
                  New Deaths
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="fifth"
                  onClick={() => {
                    dispatch(resetPagination());
                    //
                  }}
                >
                  Reset
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
};

export default CountriesRank;
