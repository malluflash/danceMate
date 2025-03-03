import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [teacherName, setTeacherName] = useState("");
  const [danceForm, setDanceForm] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");
  

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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Slot</h1>
        <form onSubmit={submitHandler} className="text-gray-800 dark:text-gray-200 space-y-4">
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              placeholder="Enter the date"
              value={dateOfEvent}
              onChange={(e) => setDateOfEvent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              id="startTime"
              placeholder="Enter the time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (Hrs)</label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              id="capacity"
              placeholder="Enter capacity"
              value={capacity}
              max="20"
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="teacher" className="block text-sm font-medium mb-1">Teacher</label>
            <input
              type="text"
              id="teacher"
              placeholder="Enter teacher"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="danceForm" className="block text-sm font-medium mb-1">Dance Form</label>
            <input
              type="text"
              id="danceForm"
              placeholder="Enter dance form"
              value={danceForm}
              onChange={(e) => setDanceForm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          {isLoading && <Loader />}

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 mt-4"
            >
              Submit
            </button>
          </div>
        </form>
        
        <div className="py-4 text-gray-800 dark:text-gray-200 text-center">
          Go Back to <Link to="/slotsview" className="text-primary hover:underline">Slots</Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default SlotScreen;
