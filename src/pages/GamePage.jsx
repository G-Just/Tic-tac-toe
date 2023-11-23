//React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//Components
import { Game } from "../components/game/Game";

export function GamePage({ state }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/signin", { state: "deny" });
    }
  }, []);
  return <Game />;
}
