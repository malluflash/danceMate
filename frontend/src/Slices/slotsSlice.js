import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slotDetails: null,
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setSlotDetails: (state, action) => {
      state.slotDetails = action.payload;
    },
  },
});

export const { setSlotDetails } = slotsSlice.actions;


export default slotsSlice.reducer;
