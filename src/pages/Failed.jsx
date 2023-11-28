import { Col, Container, Row } from "react-bootstrap";

export function FailedPage() {
  return (
    <Container className="py-5 my-5">
      <Row className="text-center">
        <Col>
          <h1 style={{ fontSize: "5em" }}>404</h1>
        </Col>
      </Row>
    </Container>
  );
}
