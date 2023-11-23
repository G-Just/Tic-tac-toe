import { useNavigate, useLocation } from "react-router-dom";
import { PopUp } from "../components/popup/Popup";
import { useState, useEffect } from "react";

export function Profile({ state }) {
  const [popup, setPopUp] = useState(null);
  const navigate = useNavigate();
  const redirected = useLocation();
  useEffect(() => {
    if (redirected.state === "signin") {
      setPopUp(<PopUp text={"Logged In, Welcome"} type="success" />);
    }
    if (!state.loggedIn) {
      navigate("/signin", { state: "deny" });
    }
  }, []);
  return (
    <>
      {popup}
      <h1>Profile</h1>
    </>
  );
}
