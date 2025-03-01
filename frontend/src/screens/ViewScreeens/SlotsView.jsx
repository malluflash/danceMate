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
    return <p className="text-error text-center p-4">Error: {error.message}</p>;
  }

  const filteredSlots = slots.filter((slot) => !cancelledSlots.includes(slot._id));

  return (
    <div className="text-center">
      <SlotsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlots.map((slot) => (
            <div key={slot._id} className="flex justify-center">
              <div className="max-w-[300px] w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
                    {slot.danceForm}
                  </h3>
                  <h4 className="mb-2 text-gray-600 dark:text-gray-400 text-center">
                    Teacher: {slot.teacherName}
                  </h4>
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-1">
                    Date: {new Date(slot.dateOfEvent).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-1">
                    Start Time: {formatStartTime(slot.startTime)}
                  </p>
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-1">
                    Duration: {slot.duration} Hours
                  </p>
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                    Capacity: {slot.capacity}
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="w-1/2 mr-2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition-colors duration-200"
                      onClick={() => navigate(`/editslot?slotId=${slot._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={`w-1/2 py-2 px-4 rounded transition-colors duration-200 ${
                        cancelledSlots.includes(slot._id)
                          ? "bg-red-300 text-white cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      onClick={() => confirmCancel(slot._id)}
                      disabled={cancelledSlots.includes(slot._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlotsContainer>
    </div>
  );
};

export default SlotsView;