import { Button, Card, Col, Row } from "react-bootstrap";
import {
  useCreateBookingMutation,
  useViewScheduleQuery,
} from "../Slices/bookingApiSlice";
import Loader from "../components/Loader";
import SlotsContainer from "../components/SlotsContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduledClass = () => {
  const { data: slots, error, isLoading } = useViewScheduleQuery();
  const [createBooking] = useCreateBookingMutation();

  const navigate = useNavigate();

  const handleBooking = async (slotId) => {
    try {
      await createBooking({ slotId }).unwrap();
      toast.success("Booking successful!");
      navigate("/viewbookings");
    } catch (error) {
      console.log("Error creating booking:", error);
      toast.error(error.data.message);
    }
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

  return (
    <div className="text-center">
      <SlotsContainer className="card-container">
        <Row xs={1} md={2} lg={3} className="g-4">
          {slots.map((slot) => (
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
                      onClick={() => handleBooking(slot._id)}
                    >
                      Book
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

export default ScheduledClass;
