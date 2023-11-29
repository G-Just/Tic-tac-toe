// React
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
// Components
import { PopUp } from "../components/popup/Popup";
// Assets
import Pfp from "../assets/pfp.jpg";

export function Signin({ data, setState, state }) {
  const navigate = useNavigate();
  const redirected = useLocation();
  const [popup, setPopUp] = useState(null);
  useEffect(() => {
    if (redirected.state === "signout") {
      setPopUp(<PopUp text={"Signed out"} type="warning" />);
    }
    if (redirected.state === "deny") {
      setPopUp(<PopUp text={"Sign in to use this feature!"} type="warning" />);
    }
    if (redirected.state === "created") {
      setPopUp(<PopUp text={"Account created successfully"} type="success" />);
    }
  }, []);

  return (
    <>
      <Container className="my-5">
        {popup}
        <Row className="h-100 align-items-center justify-content-center">
          <Col
            xs={11}
            sm={10}
            lg={9}
            xl={7}
            style={{ outline: "5px solid white", borderRadius: "20px" }}
            className="px-5"
          >
            <Container className="px-5">
              <h1 className="text-center pt-5 pb-4" style={{ fontSize: "5em" }}>
                Sign In
              </h1>
              <p className="text-center">Select your profile</p>
              <Container className="signin-container mb-4">
                {data.map((user) => {
                  return (
                    <Row
                      key={user.id}
                      className="profile-selector"
                      onClick={() => {
                        setState({ ...state, loggedIn: true, id: user.id });
                        navigate("/Tic-tac-toe/profile", { state: "signin" });
                      }}
                    >
                      <Col xs={2}>
                        <Image src={Pfp} roundedCircle fluid></Image>
                      </Col>
                      <Col xs={9}>
                        <Row>
                          <Row className="signin-username fs-3">
                            {user.username} #{user.id}
                          </Row>
                          <Row>{user.email}</Row>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </Container>
            </Container>
            <p className="text-center">
              Don't have an account? <Link to="/Tic-tac-toe/signup">Sign Up</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
