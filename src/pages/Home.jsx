import { useState, useEffect } from "react";
import { PopUp } from "../components/popup/Popup";

const URL = `https://cat-fact.herokuapp.com/facts`;

export function Home() {
  const [catFact, assignCatFact] = useState("Loading...");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      response
        .json()
        .then((json) =>
          assignCatFact(json[Math.floor(Math.random() * 5)].text)
        );
    };
    fetchData();
  }, []);
  return (
    <>
      <PopUp text={`Did you know : ${catFact}`} />
      <h1 className="text-center mt-5 pt-5">Home (under development)</h1>;
    </>
  );
}
