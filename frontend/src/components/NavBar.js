import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="px-2 bg-dark"
    >
      <Navbar.Brand
        role="button"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          alt="CoronaStat app logo"
          src={logo}
          width="40"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        CoronaStats
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <Nav.Link
            onClick={() => {
              navigate("/");
            }}
          >
            World
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/countries");
            }}
          >
            Countries
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate(`/country/direct`);
            }}
          >
            Country
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
