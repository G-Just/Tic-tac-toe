//React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Components
import { Game } from "../components/game/Game";

export function GamePage({ state, data, setData }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/Tic-tac-toe/signin", { state: "deny" });
    }
  }, []);
  return <Game data={data} state={state} setData={setData} />;
}
