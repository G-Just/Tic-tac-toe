//Router
import { Link } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//Style
import Style from "./Header.module.css";

export function Header({ state }) {
  let current = undefined;
  if (!state.loggedIn) {
    current = (
      <Nav>
        <Link className="nav-link mx-3 fs-3" to="/signin">
          Sign In
        </Link>
        <Link className="nav-link mx-3 fs-3" to="/signup">
          Sign Up
        </Link>
      </Nav>
    );
  } else {
    current = (
      <Nav>
        <Link className="nav-link mx-3 fs-3" to="/profile">
          Profile {}
        </Link>
        <Link className="nav-link mx-3 fs-3" to="/">
          Sign Out
        </Link>{" "}
      </Nav>
    );
  }
  return (
    <Navbar expand="lg" bg="primary" className={Style.header}>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav fs-3">
          <Nav className="me-auto">
            <Link className="nav-link mx-3 fs-3" to="/">
              Home
            </Link>
            <Link className="nav-link mx-3 fs-3" to="/game">
              Game
            </Link>
          </Nav>
          {current}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
