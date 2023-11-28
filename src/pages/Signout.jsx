import { useNavigate } from "react-router-dom";

export function Signout({ state, setState }) {
  const navigate = useNavigate();
  setState({ loggedIn: false, id: null });
  if (!state.loggedIn) {
    navigate("/signin", { state: "signout" });
  }
}
