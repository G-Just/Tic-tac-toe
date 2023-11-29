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
// Assets
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
      navigate("/Tic-tac-toe/signin", { state: "deny" });
    }
  }, []);

  function ratio() {
    if (data[state.id].played > 0) {
      if (data[state.id].won === 0) {
        return "0%";
      }
      if (data[state.id].lost === 0) {
        return "100%";
      }
      if (data[state.id].won > 0 && data[state.id].lost > 0) {
        return `${((data[state.id].won * 100) / data[state.id].played).toFixed(
          0
        )}%`;
      }
    } else {
      return "-";
    }
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
                <h3 className="my-2">{`${data[state.id].email} #${
                  data[state.id].id
                }`}</h3>
                <p>Some data badges maybe</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col className="p-3">
                <h1 className="text-center">Stats</h1>
                <table className="profile-table">
                  <tbody>
                    <tr>
                      <td>Games played </td>
                      <td>{data[state.id].played}</td>
                    </tr>
                    <tr>
                      <td>Games won</td>
                      <td>{data[state.id].won}</td>
                    </tr>
                    <tr>
                      <td>Games lost</td>
                      <td>{data[state.id].lost}</td>
                    </tr>
                    <tr>
                      <td>Games drawn</td>
                      <td>{data[state.id].draw}</td>
                    </tr>
                    <tr>
                      <td>Win rate</td>
                      <td>{ratio()}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
