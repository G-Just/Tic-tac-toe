import { useState, useEffect } from "react";
import { PopUp } from "../components/popup/Popup";

const URL = `https://api.themotivate365.com/stoic-quote`;

export function Home() {
  const [catFact, assignCatFact] = useState("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      response.json().then((json) => assignCatFact(json.quote));
    };
    fetchData();
  }, []);
  return (
    <>
      <PopUp text={`${catFact}`} />
      <h1 className="text-center" style={{ marginTop: "200px" }}>
        Home (under development)
      </h1>
    </>
  );
}
