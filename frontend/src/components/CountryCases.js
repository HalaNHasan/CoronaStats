import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
const CountryCases = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [country, setCountry] = useState("");

  return (
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group
              className="mb-3 d-flex align-items-center gap-2"
              controlId="formBasicEmail"
            >
              <Form.Label style={{ width: "5rem" }}>Country</Form.Label>
              <Form.Control
                style={{ width: "10rem" }}
                type="text"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group
              className="mb-3 d-flex align-items-center gap-2"
              controlId="formBasicEmail"
            >
              <Form.Label style={{ width: "5rem" }}>From</Form.Label>
              <Form.Control
                style={{ width: "10rem" }}
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group
              className="mb-3 d-flex align-items-center gap-2"
              controlId="formBasicEmail"
            >
              <Form.Label style={{ width: "5rem" }}>to</Form.Label>
              <Form.Control
                style={{ width: "10rem" }}
                type="date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CountryCases;
