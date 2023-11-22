import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Signout({ state, setState }) {
  const navigate = useNavigate();
  setState({ ...state, loggedIn: false, id: null });
  if (!state.loggedIn) {
    navigate("/signin", { state: "signout" });
  }
}
