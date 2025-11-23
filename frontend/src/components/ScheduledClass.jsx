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
    return <p className="text-error text-center p-4">Error: {error.message}</p>;
  }

  return (
    <div className="text-center">
      <SlotsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => (
            <div key={slot._id} className="flex justify-center">
              <div className="max-w-[300px] w-full bg-gradient-to-br from-primary/60 via-secondary/60 to-accent/60 backdrop-blur-lg rounded-lg shadow-md overflow-hidden border border-primary/30">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-center text-white mb-2">
                    {slot.danceForm}
                  </h3>
                  <h4 className="mb-2 text-white/90 text-center">
                    Teacher: {slot.teacherName}
                  </h4>
                  <p className="text-center text-white/90 mb-1">
                    Date: {new Date(slot.dateOfEvent).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-center text-white/90 mb-1">
                    Start Time: {formatStartTime(slot.startTime)}
                  </p>
                  <p className="text-center text-white/90 mb-1">
                    Duration: {slot.duration} Hours
                  </p>
                  <p className="text-center text-white/90 mb-4">
                    Capacity: {slot.capacity}
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="w-1/2 mr-2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition-colors duration-200"
                      onClick={() => handleBooking(slot._id)}
                    >
                      Book
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

export default ScheduledClass;
