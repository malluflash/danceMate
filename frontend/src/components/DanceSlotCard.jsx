import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import SlotsContainer from "./SlotsContainer";

function DanceSlotCard() {
  return (
    <SlotsContainer>
      <Card style={{ maxWidth: "300px" }} className=" mx-5 bg-light">
        <Card.Body>
          <Card.Title className="text-center">Dance Form</Card.Title>
          <Card.Subtitle className="mb-2 text-center ">Teacher</Card.Subtitle>
          <Card.Text className=" text-center ">Date</Card.Text>
          <Card.Text className="text-center">Time Slot</Card.Text>
          <Card.Text className="mb-3 text-center">Total Count</Card.Text>
          <div className="text-center">
            <Button variant="warning" className="w-50" href="#">
              Edit
            </Button>
            <Button
              width={100}
              variant="danger"
              className="mt-2 mx-2 w-50"
              href="#"
            >
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </SlotsContainer>
  );
}

export default DanceSlotCard;
