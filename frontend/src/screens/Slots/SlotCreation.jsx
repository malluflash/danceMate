import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useCreateSlotsMutation } from "../../Slices/slotsApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setSlotDetails } from "../../Slices/slotsSlice";

const SlotCreation = () => {
  const [dateOfEvent, setDateOfEvent] = useState('');
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("1");
  const [capacity, setCapacity] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [danceForm, setDanceForm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createSlots, { isLoading }] = useCreateSlotsMutation();

  const slotDetails = useSelector((state) => state.slotDetails);


  useEffect(() => {
    if (slotDetails) {
      navigate("/slotsview");
    }
  }, [navigate, slotDetails]);

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const validateForm = () => {
    if (
      !dateOfEvent.trim() ||
      !startTime.trim() ||
      !duration.trim() ||
      !capacity.trim() ||
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
        const res = await createSlots({
          dateOfEvent,
          startTime,
          duration,
          capacity,
          teacherName,
          danceForm,
        }).unwrap();
        dispatch(setSlotDetails({ ...res }));
        navigate("/slotsview");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div>
        <h1 className="text-dark mb-5">Create a new Slot</h1>
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
            <Button type="submit" variant="info" className="mt-3">
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

export default SlotCreation;
