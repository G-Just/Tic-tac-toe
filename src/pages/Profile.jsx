//React
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
//Components
import { PopUp } from "../components/popup/Popup";
import Pfp from "../assets/pfp.jpg";
export function Profile({ data, state }) {
  const [popup, setPopUp] = useState(null);
  const navigate = useNavigate();
  const redirected = useLocation();

  useEffect(() => {
    if (redirected.state === "signin") {
      setPopUp(<PopUp text={"Logged In, Welcome"} type="success" />);
    }
    if (!state.loggedIn) {
      navigate("/signin", { state: "deny" });
    }
  }, []);

  function getInfo() {
    const info = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === state.id) {
        info.id = data[i].id;
        info.email = data[i].email;
        info.password = data[i].password;
      }
    }
    return info;
  }
  return (
    <>
      {popup}
      <Container
        className="my-5 bg-dark"
        style={{ border: "5px solid white", color: "white" }}
        fluid={"md"}
      >
        <Row>
          <Col
            sm={6}
            md={6}
            xl={4}
            style={{
              borderRight: "5px solid white",
            }}
          >
            <Row className="justify-content-center p-3 ">
              <Col md={6}>
                <Image src={Pfp} fluid roundedCircle />
              </Col>
              <Col xs={12} className="text-center">
                <h3 className="my-2">{`${getInfo().email} #${
                  getInfo().id
                }`}</h3>
                <p>Some data badges maybe</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col className="p-3">
                <h1 className="text-center">Stats</h1>
                <h5>This might need to be a table</h5>
                <h5>Games played :</h5>
                <h5>Games won :</h5>
                <h5>Games lost :</h5>
                <h5>W/L ratio :</h5>
                <h5>Something else :</h5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
