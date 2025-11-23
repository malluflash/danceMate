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
    return <p className="text-error text-center p-4">Error: {error.message}</p>;
  }

  const filteredBookings = bookings.filter((booking) => !cancelledBooking.includes(booking._id));


  return (
    <div className="text-center">
      <SlotsContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="flex justify-center">
              <div className="max-w-[300px] w-full bg-gradient-to-br from-primary/60 via-secondary/60 to-accent/60 backdrop-blur-lg rounded-lg shadow-md overflow-hidden border border-primary/30">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-center text-white mb-2">
                    {booking.danceType}
                  </h3>
                  <h4 className="mb-2 text-white/90 text-center">
                    Teacher: {booking.teacher}
                  </h4>
                  <p className="text-center text-white/90 mb-1">
                    Date:
                    {new Date(booking.dateOfEvent).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-center text-white/90 mb-1">
                    Start Time: {booking.startTime % 12 || 12}{" "}
                    {booking.startTime < 12 ? "AM" : "PM"}
                  </p>
                  <p className="text-center text-white/90 mb-4">
                    Duration: {booking.duration} Hours
                  </p>

                  <div className="text-center">
                    <button
                      className={`w-1/2 mt-2 mx-2 py-2 px-4 rounded transition-colors duration-200 ${
                        cancelledBooking.includes(booking._id)
                          ? "bg-red-300 text-white cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      onClick={() => confirmCancel(booking._id)}
                      disabled={cancelledBooking.includes(booking._id)}
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

export default ViewBookings;
