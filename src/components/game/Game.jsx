//React
import { useState } from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Components

export function Game() {
  //Initializing the grid
  const [grid, setGrid] = useState([
    ["e", "e", "e"],
    ["e", "e", "e"],
    ["e", "e", "e"],
  ]);
  //Game logic
  let turn = "player";
  function place(x, y) {
    const localGrid = [...grid];
    if (grid[x][y] !== "x" && grid[x][y] !== "o") {
      if (turn === "player") {
        localGrid[x][y] = "x";
        turn = "ai";
      }
    }
    setGrid(localGrid);
  }
  function winConditionCheck(grid) {}
  function aiMove(grid) {}
  return (
    <Container className="py-5">
      {grid.map((row, rowIndex) => {
        return (
          <Row>
            {row.map((cell, columIndex) => (
              <Col
                onClick={() => place(rowIndex, columIndex)}
                style={{ outline: "1px solid white" }}
                className="p-5 text-center fs-1"
              >
                {cell}
              </Col>
            ))}
          </Row>
        );
      })}
    </Container>
  );
}
