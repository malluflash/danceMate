import { Button, Card, Row, Col } from "react-bootstrap";
import Loader from "..//..//components/Loader";
import SlotsContainer from "../../components/SlotsContainer";
import {
  useViewBookingsQuery,
  useCancelBookingMutation,
} from "../../Slices/bookingApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const ViewBookings = () => {
  const { data: bookings, error, isLoading } = useViewBookingsQuery();
  const [cancelBooking] = useCancelBookingMutation();
  const [cancelledBooking, setCancelledBooking] = useState([]);

  
  const confirmCancel = async (bookingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (isConfirmed) {
      try {
        await cancelBooking(bookingId);
        toast.success("The Slot has been Cancelled");
        handleCancelButton(bookingId);
      } catch (error) {
        console.error("Error cancelling slot:", error);
      }
    }
  };

  const handleCancelButton = (bookingId) => {
    setCancelledBooking((prevCancelledBooking) => [
      ...prevCancelledBooking,
      bookingId,
    ]);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredBookings = bookings.filter((booking) => !cancelledBooking.includes(booking._id));


  return (
    <>
      <div className="text-center">
        <SlotsContainer className="card-container">
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredBookings.map((booking) => (
            <Col key={booking._id}>
            <Card
              style={{ maxWidth: "300px" }}
              className="mx-auto mb-3 shadow bg-light"
            >
              <Card.Body>
                <Card.Title className="text-center">
                  {booking.danceType}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-center">
                  Teacher: {booking.teacher}
                </Card.Subtitle>
                <Card.Text className="text-center">
                  Date:
                  {new Date(booking.dateOfEvent).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Card.Text>
                <Card.Text className="text-center">
                  Start Time: {booking.startTime % 12 || 12}{" "}
                  {booking.startTime < 12 ? "AM" : "PM"}
                </Card.Text>
                <Card.Text className="text-center">
                  Duration: {booking.duration} Hours
                </Card.Text>

                <div className="text-center">
                  <Button
                    width={100}
                    variant="danger"
                    className="mt-2 mx-2 w-50"
                    onClick={() => confirmCancel(booking._id)}
                    disabled={cancelledBooking.includes(booking._id)}
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
    </>
  );
};

export default ViewBookings;
