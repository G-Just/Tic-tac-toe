//Router
import { Link } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
//Style
import Style from "./Header.module.css";

export function Header({ state }) {
  let current = undefined;
  if (!state.loggedIn) {
    current = (
      <Nav>
        <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/signin">
          Sign In
        </Link>
        <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/signup">
          Sign Up
        </Link>
      </Nav>
    );
  } else {
    current = (
      <Nav>
        <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/profile">
          Profile
        </Link>
        <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/signout">
          Sign Out
        </Link>
      </Nav>
    );
  }
  return (
    <Navbar key={"lg"} expand={"lg"} className={`bg-primary ${Style.header}`}>
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
              <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/">
                Home
              </Link>
              <Link className="nav-link mx-3 fs-3" to="/Tic-tac-toe/game">
                Game
              </Link>
              <Link
                className="nav-link mx-3 fs-3"
                to="/Tic-tac-toe/leaderboard"
              >
                Leaderboard
              </Link>
            </Nav>
            {current}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
