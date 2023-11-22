import { useLocation } from "react-router-dom";
import { PopUp } from "../components/popup/Popup";

export function Profile() {
  const redirected = useLocation();
  if (redirected.state === "signin") {
    return <PopUp text={"Logged in, Welcome."} type="success" />;
  }
  return <h1>Profile</h1>;
}
