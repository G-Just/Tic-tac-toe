//Router
import { Link } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
//Style
import Style from "./Header.module.css";

export function NewHeader({ state }) {
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
        <Link className="nav-link mx-3 fs-3" to="/signout">
          Sign Out
        </Link>
      </Nav>
    );
  }
  return (
    <Navbar
      key={"lg"}
      expand={"lg"}
      className={`bg-primary mb-3 ${Style.header}`}
    >
      <Container fluid>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton className="bg-primary text-light">
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Link className="nav-link mx-3 fs-3" to="/">
                Home
              </Link>
              <Link className="nav-link mx-3 fs-3" to="/game">
                Game
              </Link>
            </Nav>
            {current}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
