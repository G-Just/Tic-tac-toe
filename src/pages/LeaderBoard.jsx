import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LeaderBoardActual } from "../components/leaderboard/LeaderBoardActual";
import { useState } from "react";

export function LeaderBoard({ data }) {
  const [selected, setSelected] = useState("norm");
  return (
    <Container>
      <Row className="justify-content-evenly my-4 p-2">
        <Col xs={4}>
          <Button
            variant={selected === "norm" ? "light" : "dark"}
            className="w-100 fs-3"
            onClick={() => setSelected("norm")}
          >
            Normal
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant={selected === "max" ? "light" : "dark"}
            className="w-100 fs-3"
            onClick={() => setSelected("max")}
          >
            Unbeatable
          </Button>
        </Col>
      </Row>
      <h1 className="text-center">Leaderboard</h1>
      <LeaderBoardActual data={data} selected={selected} />
    </Container>
  );
}
