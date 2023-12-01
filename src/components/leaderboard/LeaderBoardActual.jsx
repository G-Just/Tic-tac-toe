import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function LeaderBoardActual({ data, selected }) {
  const sortedList = data.sort((a, b) => {
    return a.stats[selected].won - a.stats[selected].won;
  });
  function ratio(user) {
    if (user.stats[selected].won < 1 && user.stats[selected].lost > 0) {
      return `0%`;
    }
    if (user.stats[selected].won === 0 && user.stats[selected].lost === 0) {
      return `-`;
    }
    return (
      (user.stats[selected].won /
        (user.stats[selected].won + user.stats[selected].lost)) *
        100 +
      " %"
    );
  }
  return sortedList.map((user, position) => {
    return (
      <Row>
        <Col>{position + 1}</Col>
        <Col>
          {user.username} #{user.id}
        </Col>
        <Col>Wins : {user.stats[selected].won}</Col>
        <Col>Losses : {user.stats[selected].lost}</Col>
        <Col>W/L Ratio : {ratio(user)}</Col>
      </Row>
    );
  });
}
