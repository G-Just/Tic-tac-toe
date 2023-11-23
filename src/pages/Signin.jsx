//React
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//Components
import { PopUp } from "../components/popup/Popup";

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

  function validate(e) {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].email === e.target[0].value &&
        data[i].password === e.target[1].value
      ) {
        e.target[0].value = "";
        e.target[1].value = "";
        setState({ ...state, loggedIn: true, id: data[i].id });
        navigate("/profile", { state: "signin" });
      } else {
        setPopUp(
          <PopUp text={"Wrong email (and/or) password!"} type="danger" />
        );
      }
    }
  }
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
            <Form onSubmit={(e) => validate(e)}>
              <h1 className="text-center py-5" style={{ fontSize: "5em" }}>
                Sign In
              </h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Row className="justify-content-center py-4">
                <Col xs={7} sm={6}>
                  <Button
                    className="w-100 p-2 fs-4"
                    variant="primary"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Col>
              </Row>
              <p className="text-center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">Lazy-bones? Sign in with :</Row>
        <Row className="justify-content-center">email : admin@admin.com</Row>
        <Row className="justify-content-center">password : admin</Row>
      </Container>
    </>
  );
}
