import asyncHandler from "express-async-handler";
import Bookings from "../models/bookingsModel.js";
import Slots from "../models/slotsModel.js";

// @description Create a booking
// route        POST /api/createBooking/:_id
// @access      Private
const createBookings = asyncHandler(async (req, res) => {
  const { slotId } = req.body;


  const slot = await Slots.findById(slotId);

  console.log("received ID", slotId);

  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  const existingUserBooking = await Bookings.findOne({
    slotId,
    userId: req.user._id,
  });

  if (existingUserBooking) {
    res.status(400);
    throw new Error("You have already booked this slot");
  }

  if (slot.capacity >= 1) {
    const booking = await Bookings.create({
      slotId: slotId,
      userId: req.user._id,
      bookedBy: req.user.email,
      danceType: slot.danceForm,
      teacher: slot.teacherName,
      dateOfEvent: slot.dateOfEvent,
      startTime: slot.startTime,
      duration: slot.duration,
    });

    // Update the slot's capacity
    slot.capacity -= 1;
    await slot.save();

    res.status(201).json({
      message: "Your booking has been created successfully",
      _id: booking._id,
      slotId,
      userId: req.user._id,
    });
  } else {
    res.status(400);
    throw new Error("Slot is fully booked");
  }
});

// @description View created bookings
// route        GET /api/viewBookings
// @access      Private
const viewBookings = asyncHandler(async (req, res) => {
  const userBookings = await Bookings.find({
    userId: req.user._id,
    isCancelled: false,
  }).populate();

  res.status(200).json(userBookings);
});


// @description View slots to book
// route        GET /api/viewBookings
// @access      Private
const viewSchedule = asyncHandler(async (req, res) => {
  const allSlots = await Slots.find({ isCancelled: false });
  res.status(200).json(allSlots);
});

// @description Cancel a booking
// route        PUT /api/cancelBookings/:id
// @access      Private
const cancelBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  const booking = await Bookings.findById(bookingId);

  if (!booking) {
    res.status(404);

    throw new Error("Booking not found");
  }

  if (booking.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized to cancel this booking");
  }
  if (booking) {
    booking.isCancelled = true;
  }

  const slot = await Slots.findById(booking.slotId);

  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  slot.capacity += 1;

  const [cancelledBooking, updatedSlot] = await Promise.all([
    booking.save(),
    slot.save(),
  ]);

  res.status(200).json({
    message: "Booking cancelled successfully",
    cancelledBooking,
    updatedSlot,
  });
});

export { createBookings, viewBookings, cancelBooking, viewSchedule };
