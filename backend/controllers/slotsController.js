import asyncHandler from "express-async-handler";
import Slots from "../models/slotsModel.js";
import User from "../models/userModel.js";

// @description Create a booking
// route        POST/api/createBooking
// @access      Private
const createSlots = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.user._id);
  const { dateOfEvent, startTime, duration, capacity, danceForm, teacherName } =
    req.body;

  const slots = await Slots.create({
    dateOfEvent,
    startTime,
    duration,
    capacity,
    danceForm,
    teacherName,
    creatorId: userId,
    isCancelled: false,
  });

  if (slots) {
    res.status(201).json({
      message: "The Slot has been created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Slot details are incorrect");
  }
});

// @description view created slots
// route        GET/api/viewBookings
// @access      Private
const viewSlots = asyncHandler(async (req, res) => {
  const allSlots = await Slots.find({ isCancelled: false });
  res.status(200).json(allSlots);
});

// @description view slot by ID
// route        GET/api/view/:id
// @access      Private
const viewSlotById = asyncHandler(async (req, res) => {
  const slotId = req.params.id;
  const slot = await Slots.findById(slotId);
  res.status(200).json(slot);
});

// @description Edit a slot
// route        PUT /api/editSlot/:id
// @access      Private
const editSlots = asyncHandler(async (req, res) => {
  const slotId = req.params.id;
  const { dateOfEvent, startTime, duration, capacity, danceForm, teacherName } =
    req.body;

  const slot = await Slots.findById(slotId);

  if (slot) {
    slot.dateOfEvent = dateOfEvent || slot.dateOfEvent;
    slot.startTime = startTime || slot.startTime;
    slot.duration = duration || slot.duration;
    slot.capacity = capacity || slot.capacity;
    slot.danceForm = danceForm || slot.danceForm;
    slot.teacherName = teacherName || slot.teacherName;

    const editedSlot = await slot.save();
    res.status(200).json({
      _id: editedSlot._id,
      dateOfEvent: editedSlot.dateOfEvent,
      startTime: editSlots.startTime,
      duration: editedSlot.duration,
      capacity: editedSlot.capacity,
      danceForm: editedSlot.danceForm,
      teacherName: editedSlot.teacherName,
    });
  } else {
    res.status(404);
    throw new Error("Slot not found");
  }
});

// @description Cancel a slot
// route        PUT /api/cancelSlot/:id
// @access      Private
const cancelSlots = asyncHandler(async (req, res) => {
  const slotId = req.params.id;

  const slot = await Slots.findById(slotId);

  if (slot) {
    slot.isCancelled = true;
    const cancelledSlot = await slot.save();
    res.status(200).json({
      _id: cancelledSlot._id,
      message: "The slot has been cancelled successfully",
    });
  } else {
    res.status(404);
    throw new Error("Slot not found");
  }
});

export { createSlots, viewSlots, editSlots, viewSlotById, cancelSlots };
