//React
import { useState } from "react";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Components
import { PopUp } from "../popup/Popup";
import Style from "./Game.module.css";

export function Game() {
  //Initializing the grid
  const [grid, setGrid] = useState([
    ["e", "e", "e"],
    ["e", "e", "e"],
    ["e", "e", "e"],
  ]);
  const [winner, setWinner] = useState(null);
  const [playable, setPlayable] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [popUp, setPopUp] = useState(null);
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
  let anitSpam = false;
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
    } else {
      if (!anitSpam) {
        anitSpam = true;
        setPopUp(
          <PopUp text={"You must select a difficulty!"} type="warning" />
        );
        setTimeout(() => {
          setPopUp(null);
        }, 10000);
      }
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

  function aiMove(localGrid) {
    let temp;
    if (difficulty === "0") {
      for (let row = 0; row < localGrid.length; row++) {
        for (let column = 0; column < localGrid[row].length; column++) {
          if (localGrid[row][column] === "e") {
            localGrid[row][column] = "o";
            return localGrid;
          }
        }
      }
    }
    if (difficulty === "1") {
      const rand = () => Math.floor(Math.random() * 3);
      let x = rand();
      let y = rand();
      while (localGrid[x][y] !== "e") {
        x = rand();
        y = rand();
      }
      localGrid[x][y] = "o";
      return localGrid;
    }
    if (difficulty === "2") {
      for (let row = 0; row < localGrid.length; row++) {
        temp = [...localGrid[row].reduce((acc, cur) => (acc += cur))]
          .sort()
          .join("");
        if (temp === "eoo" || temp === "exx") {
          localGrid[row] = localGrid[row].join("").replace("e", "o").split("");
          return localGrid;
        }
      }
      for (let col = 0; col < localGrid[0].length; col++) {
        temp = [...(localGrid[0][col] + localGrid[1][col] + localGrid[2][col])]
          .sort()
          .join("");
        if (temp === "eoo" || temp === "exx") {
          for (let i = 0; i < localGrid.length; i++) {
            if (localGrid[i][col] === "e") {
              localGrid[i][col] = "o";
              return localGrid;
            }
          }
        }
      }
      temp = "";
      let tempEmpty;
      for (let i = 0; i < 3; i++) {
        if (localGrid[i][i] === "e") {
          tempEmpty = i;
        }
        temp += localGrid[i][i];
        if (
          [...temp].sort().join("") === "eoo" ||
          [...temp].sort().join("") === "exx"
        ) {
          localGrid[tempEmpty][tempEmpty] = "o";
          return localGrid;
        }
      }
      temp = "";
      for (let i = 0; i < 3; i++) {
        if (localGrid[i][2 - i] === "e") {
          tempEmpty = i;
        }
        temp += localGrid[i][2 - i];
        if (
          [...temp].sort().join("") === "eoo" ||
          [...temp].sort().join("") === "exx"
        ) {
          localGrid[tempEmpty][2 - tempEmpty] = "o";
          return localGrid;
        }
      }
      const rand = () => Math.floor(Math.random() * 3);
      let x = rand();
      let y = rand();
      while (localGrid[x][y] !== "e") {
        x = rand();
        y = rand();
      }
      localGrid[x][y] = "o";
      return localGrid;
    }
    if (difficulty === "3") {
    }
  }

  function selectDifficulty(e) {
    e.preventDefault();
    setDifficulty(e.target[0].value);
    setPlayable(true);
  }

  function changeDifficulty() {
    setPlayable(false);
    setDifficulty(null);
    setGrid([
      ["e", "e", "e"],
      ["e", "e", "e"],
      ["e", "e", "e"],
    ]);
  }

  return (
    <>
      {popUp}
      {difficulty ? (
        ""
      ) : (
        <div className={Style.difficultySelector}>
          <h1>Select difficulty</h1>
          <form
            onSubmit={(e) => {
              selectDifficulty(e);
            }}
          >
            <select>
              <option style={{ background: "lightblue" }} value="0">
                Cyberpunk 2077 A.I
              </option>
              <option style={{ background: "lightgreen" }} value="1">
                Very easy
              </option>
              <option style={{ background: "orange" }} value="2" selected>
                Normal
              </option>
              <option style={{ background: "red" }} value="3" disabled>
                Unbeatable (coming soon)
              </option>
            </select>
            <button>Select</button>
          </form>
        </div>
      )}
      <Container className={`py-5 ${Style.container}`}>
        {grid.map((row, rowIndex) => {
          return (
            <Row key={rowIndex}>
              {row.map((cell, columIndex) => (
                <Col
                  key={columIndex}
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
      <button className={Style.changeDif} onClick={changeDifficulty}>
        Change difficulty
      </button>
    </>
  );
}
