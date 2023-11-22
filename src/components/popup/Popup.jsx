import Alert from "react-bootstrap/Alert";
import Style from "./Popup.module.css";

export function PopUp({ text, type = "dark" }) {
  return (
    <Alert className={`${Style.alert}`} key={type} variant={type}>
      {text}
    </Alert>
  );
}
