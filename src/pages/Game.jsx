import { useEffect } from "react";
import { PopUp } from "../components/popup/Popup";
import { useNavigate } from "react-router-dom";

export function Game({ state }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/signin", { state: "deny" });
    }
  }, []);
  return <h1>Game</h1>;
}
