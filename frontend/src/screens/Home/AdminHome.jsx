import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserTable from "../ViewScreeens/UserTable";

const AdminHome = () => {
  return (
    <Container
      className=" my-5"
      style={{
        border: "2px solid #343434",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Row className="justify-content-center text-center">
        <Col md={6} lg={4} className="my-3">
          <LinkContainer to="/createslots">
            <Button variant="dark" size="lg" block>
              CREATE SLOTS
            </Button>
          </LinkContainer>
        </Col>

        <Col md={6} lg={4} className="my-3">
          <LinkContainer to="/slotsview">
            <Button variant="dark" size="lg" block>
              VIEW SLOTS
            </Button>
          </LinkContainer>
        </Col>

        <Col md={6} lg={4} className="my-3">
          <LinkContainer to="/profile">
            <Button variant="dark" size="lg" block>
              PROFILE
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <UserTable />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
