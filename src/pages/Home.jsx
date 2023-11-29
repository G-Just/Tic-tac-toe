import { useState, useEffect } from "react";
import { PopUp } from "../components/popup/Popup";
import { Canvas } from "../components/canvas/Canvas";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const URL = `https://api.themotivate365.com/stoic-quote`;

export function Home() {
  const [catFact, assignCatFact] = useState("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      response.json().then((json) => assignCatFact(json.quote));
    };
    fetchData();
  }, []);
  return (
    <>
      <PopUp text={`${catFact}`} />
      <h1
        className="text-center"
        style={{
          color: "white",
          fontSize: "8em",
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        Home
      </h1>
      <Container
        fluid
        className="px-0 my-0 py-0"
        style={{ overflow: "hidden" }}
      >
        <Canvas />
      </Container>
      <Container fluid className="text-white mt-5 px-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={4}>
            <h1>Sing up</h1>
            <p>
              Sign up and get started, only valid email and username is required{" "}
            </p>
          </Col>
          <Col xs={12} sm={4}>
            <h1>Play</h1>
            <p>
              Sign in to your account and play the game. Select suitable
              difficulty and show off your tic tac toe skills.
            </p>
          </Col>
          <Col xs={12} sm={4}>
            <h1>Compete</h1>
            <p>
              Track your progress and see the statistics of your games on
              individual profile page. Collect badges based on your performance.
              Compete with others and track how you measure up on the
              leaderboard.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
