import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Style from "./Badges.module.css";

export function Badges({ user }) {
  const [badges, setBadges] = useState(null);
  function assignBadges() {
    let localCollection = [];
    //Very easy
    if (user.stats.ve.won >= 50 && user.stats.ve.won < 200) {
      localCollection.push(["Meany", "secondary", "Defeated 50+ very easy A.I"]);
    }
    if (user.stats.ve.won >= 200 && user.stats.ve.won < 1000) {
      localCollection.push(["Bully", "success", "Defeated 200+ very easy A.I"]);
    }
    if (user.stats.ve.won >= 1000) {
      localCollection.push(["Terrorist", "warning", "Defeated 1,000+ very easy A.I"]);
    }
    //Easy
    if (user.stats.e.won >= 50 && user.stats.e.won < 200) {
      localCollection.push(["Beginner", "secondary", "Defeated 50+ easy A.I"]);
    }
    if (user.stats.e.won >= 200 && user.stats.e.won < 1000) {
      localCollection.push(["Intermediate", "success", "Defeated 200+ easy A.I"]);
    }
    if (user.stats.e.won >= 1000) {
      localCollection.push(["Pro", "warning", "Defeated 1,000+ easy A.I"]);
    }
    //Normal
    if (user.stats.norm.won >= 50 && user.stats.norm.won < 200) {
      localCollection.push(["Formidable", "secondary", "Defeated 50+ normal A.I"]);
    }
    if (user.stats.norm.won >= 200 && user.stats.norm.won < 1000) {
      localCollection.push(["Grand Master", "success", "Defeated 200+ normal A.I"]);
    }
    if (user.stats.norm.won >= 1000) {
      localCollection.push(["Transcended", "warning", "Defeated 1,000+ normal A.I"]);
    }
    //Total wins
    const totalWins = Object.entries(user.stats).reduce(
      (acc, cur) => (acc += cur[1].won),
      0
    );
    if (totalWins >= 200 && totalWins < 1000) {
      localCollection.push(["Casual", "secondary", "Have 200+ total wins"]);
    }
    if (totalWins >= 1000 && totalWins < 5000) {
      localCollection.push(["Enthusiast", "success", "Have 1,000+ total wins"]);
    }
    if (totalWins >= 5000) {
      localCollection.push(["Devotee", "warning", "Have 5,000+ total wins"]);
    }
    //Total losses
    const totalLosses = Object.entries(user.stats).reduce(
      (acc, cur) => (acc += cur[1].lost),
      0
    );
    if (totalLosses >= 50 && totalLosses < 200) {
      localCollection.push(["Taste of defeat", "secondary", "Lost 50+ times total"]);
    }
    if (totalLosses >= 200 && totalLosses < 700) {
      localCollection.push(["Bloody", "success", "Lost 200+ times total"]);
    }
    if (totalLosses >= 700) {
      localCollection.push(["Masochist", "warning", "Lost 700+ times total"]);
    }
    const temp = [...new Set(localCollection)];
    setBadges([...temp]);
  }

  useEffect(() => {
    assignBadges();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <p className={Style.tooltipbig}>
        ?
        <span className={Style.tooltiptextbig}>
          **BADGES**<br></br>
          <br></br>
          *Time spent*<br></br>
          New - new user 0-24h<br></br>
          Experienced - 24-72h<br></br>
          Veteran - 72h+<br></br>
          <br></br>*Defeating very easy AI<br></br>
          Meany - defeated very easy AI 50 times<br></br>
          Bully -defeated very easy AI 200 times<br></br>
          Terrorist - defeated very easy AI 1000times<br></br>
          <br></br>*Defeating easy AI*<br></br>
          Beginner - defeated easy AI 50 times<br></br>
          Intermediate - defeated easy AI 200 times<br></br>
          Pro - defeated easy AI 1000 times<br></br>
          <br></br>*Defeating normal AI*<br></br>
          Formidable - defeated normal AI 50 times<br></br>
          Grand Master - defeated normal AI 200 times<br></br>
          Transcended - defeated normal AI 1000 times<br></br>
          <br></br>*Defeating any AI*<br></br>
          Casual - defeated any AI 200 times<br></br>
          Enthusiast - defeated any AI 1000 times<br></br>
          Devotee - defeated any AI 5000 times<br></br>
          <br></br>*Losses*<br></br>
          Taste of defeat - lose 50 times<br></br>
          Bloody - lose 200 times<br></br>
          Masochist - lose 700 times
        </span>
      </p>
      <p>
        {badges?.length > 0
          ? badges.map((badge, idx) => {
              return (
                <Badge
                  key={idx}
                  className={`fs-6 my-1 mx-1 ${Style.tooltip}`}
                  bg={badge[1]}
                >
                  {badge[0]}
                  <span className={Style.tooltiptext}>{badge[2]}</span>
                </Badge>
              );
            })
          : "No badges earned yet ..."}
      </p>
    </div>
  );
}

/*
=====BADGES=====

=====Time spent=====
New - new user 0-24h
Experienced - 24-72h
Veteran - 72h+

=====Defeating very easy AI tiers=====
Meany - defeated very easy AI 50 times
Bully - defeated very easy AI 200 times
Terrorist - defeated very easy AI 1000 times

=====Defeating easy AI tiers=====
Beginner - defeated easy AI 50 times
Intermediate - defeated easy AI 200 times
Pro - defeated easy AI 1000 times

=====Defeating normal AI tiers=====
Formidable - defeated normal AI 50 times
Grand Master - defeated normal AI 200 times
Transcended - defeated normal AI 1000 times

=====Defeating any AI tiers=====
Casual - defeated any AI 200 times
Enthusiast - defeated any AI 1000 times
Devotee - defeated any AI 5000 times

=====Meta=====
Taste of defeat - lose 50 times
Bloody - lose 200 times
Masochist - lose 700 times

DO MORE LATER...
*/
