//React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//Components
import { PopUp } from "../components/popup/Popup";

export function Signup({ data, setState }) {
  const [popup, setPopUp] = useState(null);
  const navigate = useNavigate();

  function validate(e) {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === e.target[0].value) {
        setPopUp(<PopUp text={"Email taken :("} type="danger" />);
        return;
      }
    }
    if (!e.target[0].value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setPopUp(<PopUp text={"Invalid Email"} type="danger" />);
      return;
    }
    if (e.target[1].value.length < 1) {
      setPopUp(<PopUp text={"Username is required!"} type="danger" />);
      return;
    }
    setState([
      ...data,
      {
        id: data[data.length - 1].id + 1,
        email: e.target[0].value,
        username: e.target[1].value,
      },
    ]);
    e.target[0].value = "";
    e.target[1].value = "";
    navigate("/signin", { state: "created" });
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
                Sign Up
              </h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="lg"
                  type="username"
                  placeholder="Enter username"
                />
              </Form.Group>
              <Row className="justify-content-center py-4">
                <Col xs={7} sm={6}>
                  <Button
                    className="w-100 p-2 fs-4"
                    variant="primary"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
              <p className="text-center">
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
