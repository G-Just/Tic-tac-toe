//React
import { useEffect, useState } from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Components
import Style from "./Game.module.css";

export function Game() {
  //Initializing the grid
  const [grid, setGrid] = useState([
    ["e", "e", "e"],
    ["e", "e", "e"],
    ["e", "e", "e"],
  ]);
  const [winner, setWinner] = useState(null);
  const [playable, setPlayable] = useState(true);
  //Game logic
  function reset() {
    setGrid([
      ["e", "e", "e"],
      ["e", "e", "e"],
      ["e", "e", "e"],
    ]);
    setWinner(null);
    setPlayable(true);
  }
  function place(x, y) {
    if (playable) {
      let localGrid = [...grid];
      if (localGrid[x][y] !== "x" && localGrid[x][y] !== "o") {
        localGrid[x][y] = "x";
        setGrid(localGrid);
        setPlayable(false);
        if (winConditionCheck(localGrid) === "x") {
          setPlayable(false);
          setWinner("Player wins!");
          return;
        }
        if (winConditionCheck(localGrid) === "draw") {
          setPlayable(false);
          setWinner("Draw!");
          return;
        }
        setGrid(aiMove(localGrid));
        if (winConditionCheck(localGrid) === "o") {
          setPlayable(false);
          setWinner("Ai wins!");
          return;
        }
      }
      setPlayable(true);
    }
  }

  function winConditionCheck(localGrid) {
    for (let y = 0; y < localGrid.length; y++) {
      if (!localGrid[y].includes("e")) {
        if (
          localGrid[y][0] === localGrid[y][1] &&
          localGrid[y][1] === localGrid[y][2]
        ) {
          return localGrid[y][0];
        }
      }
    }
    for (let x = 0; x < localGrid[0].length; x++) {
      if (localGrid[0][x] !== "e") {
        if (
          localGrid[0][x] === localGrid[1][x] &&
          localGrid[1][x] === localGrid[2][x]
        ) {
          return localGrid[0][x];
        }
      }
    }
    if (localGrid[0][0] !== "e") {
      if (
        localGrid[0][0] === localGrid[1][1] &&
        localGrid[1][1] === localGrid[2][2]
      ) {
        return localGrid[0][0];
      }
    }
    if (localGrid[0][2] !== "e") {
      if (
        localGrid[0][2] === localGrid[1][1] &&
        localGrid[1][1] === localGrid[2][0]
      ) {
        return localGrid[0][2];
      }
    }
    for (let y = 0; y < localGrid.length; y++) {
      if (localGrid[y].includes("e")) {
        return;
      }
    }
    return "draw";
  }

  function aiMove(localGrid, difficulty = 0) {
    for (let row = 0; row < localGrid.length; row++) {
      for (let column = 0; column < localGrid[row].length; column++) {
        if (localGrid[row][column] === "e") {
          localGrid[row][column] = "o";
          return localGrid;
        }
      }
    }
  }
  return (
    <>
      <Container className={`py-5 ${Style.container}`}>
        {grid.map((row, rowIndex) => {
          return (
            <Row>
              {row.map((cell, columIndex) => (
                <Col
                  className={Style.cell}
                  onClick={() => place(rowIndex, columIndex)}
                >
                  <p>{cell !== "e" ? cell : ""}</p>
                </Col>
              ))}
            </Row>
          );
        })}
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            {winner ? (
              <>
                <h1>{winner}</h1>
                <button className={Style.button} onClick={reset}>
                  Restart?
                </button>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
