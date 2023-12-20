import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {
  useEditSlotMutation,
  useViewSlotByIdQuery,
} from "../Slices/slotsApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SlotScreen = () => {
  const [search] = useSearchParams();
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [danceForm, setDanceForm] = useState("");

  const { data: slotDetails, isLoading } = useViewSlotByIdQuery(
    search.get("slotId")
  );
  const [editSlots] = useEditSlotMutation();

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    if (slotDetails) {
      const formattedDate = new Date(slotDetails.dateOfEvent)
        .toISOString()
        .split("T")[0];
      const formattedStartTime = new Date(
        `January 1, 2000 ${slotDetails.startTime}`
      ).toLocaleTimeString("en-US", { hour12: false });

      setDateOfEvent(formattedDate);
      setStartTime(formattedStartTime);
      setDuration(slotDetails.duration);
      setCapacity(slotDetails.capacity);
      setTeacherName(slotDetails.teacherName);
      setDanceForm(slotDetails.danceForm);
    }
  }, [slotDetails]);

  const validateForm = () => {
    if (
      !dateOfEvent.trim() ||
      !startTime.trim() ||
      !duration ||
      !capacity ||
      !teacherName.trim() ||
      !danceForm.trim()
    ) {
      notifyError("All fields are required");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await editSlots({
          _id: slotDetails._id,
          dateOfEvent,
          startTime,
          duration,
          capacity,
          teacherName,
          danceForm,
        }).unwrap();
        toast.success("Slot updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div>
        <h1 className="text-dark mb-5">Edit Slot</h1>
        <Form onSubmit={submitHandler} className="text-dark">
          <Form.Group className="my-2" controlId="capacity">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter the date"
              value={dateOfEvent}
              onChange={(e) => setDateOfEvent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="capacity">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Enter the date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="duration">
            <Form.Label>{`Duration (Hrs)`}</Form.Label>
            <Form.Select
              type="number"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-2" controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter capacity"
              value={capacity}
              max="20"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="teacher">
            <Form.Label>Teacher</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter teacher"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="danceForm">
            <Form.Label>Dance Form</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter dance form"
              value={danceForm}
              onChange={(e) => setDanceForm(e.target.value)}
            />
          </Form.Group>

          {isLoading && <Loader />}

          <div className="text-center">
            <Button type="submit" variant="primary" className="mt-3">
              Submit
            </Button>
          </div>
        </Form>
        <Row className="py-3 text-dark">
          <Col>
            Go Back to <Link to={`/slotsview`}>Slots</Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default SlotScreen;
