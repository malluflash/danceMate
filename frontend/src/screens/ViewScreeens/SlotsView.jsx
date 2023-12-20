import { Button, Card, Col, Row } from "react-bootstrap";
import {
  useCancelSlotMutation,
  useViewSlotsQuery,
} from "../../Slices/slotsApiSlice";
import Loader from "..//..//components/Loader";
import SlotsContainer from "../../components/SlotsContainer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SlotsView = () => {
  const { data: slots, error, isLoading } = useViewSlotsQuery();
  const [cancelledSlots, setCancelledSlots] = useState([]);
  const [cancelSlot] = useCancelSlotMutation();
  const navigate = useNavigate();

  const confirmCancel = async (slotId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this slot?"
    );
    if (isConfirmed) {
      try {
        await cancelSlot(slotId);
        toast.success("The Slot has been Cancelled");
        handleCancelButton(slotId);
      } catch (error) {
        console.error("Error cancelling slot:", error);
      }
    }
  };

  const handleCancelButton = (slotId) => {
    setCancelledSlots((prevCancelledSlots) => [...prevCancelledSlots, slotId]);
  };

  const formatStartTime = (startTime) => {
    const formattedStartTime = new Date(`January 1, 2000 ${startTime}`);
    const hours = formattedStartTime.getHours();
    const minutes = formattedStartTime.getMinutes();

    const formattedHours = Math.floor(hours % 12) || 12;
    const period = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${padZero(minutes)} ${period}`;
  };

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredSlots = slots.filter((slot) => !cancelledSlots.includes(slot._id));

  return (
    <div className="text-center">
      <SlotsContainer className="card-container">
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredSlots.map((slot) => (
            <Col key={slot._id}>
              <Card
                style={{ maxWidth: "300px" }}
                className="mx-auto mb-3 shadow"
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    {slot.danceForm}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    Teacher: {slot.teacherName}
                  </Card.Subtitle>
                  <Card.Text className="text-center">
                    Date:{" "}
                    {new Date(slot.dateOfEvent).toLocaleDateString("en-GB")}
                  </Card.Text>
                  <Card.Text className="text-center">
                    Start Time: {formatStartTime(slot.startTime)}
                  </Card.Text>
                  <Card.Text className="text-center">
                    Duration: {slot.duration} Hours
                  </Card.Text>
                  <Card.Text className="text-center">
                    Capacity: {slot.capacity}
                  </Card.Text>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="warning"
                      className="w-50 me-2"
                      onClick={() => navigate(`/editslot?slotId=${slot._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="w-50"
                      onClick={() => confirmCancel(slot._id)}
                      disabled={cancelledSlots.includes(slot._id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </SlotsContainer>
    </div>
  );
};

export default SlotsView;