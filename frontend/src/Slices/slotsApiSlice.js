import { apiSlice } from "./apiSlice";

const SLOTS_URL = "api/slots"; 

export const slotsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSlots: builder.mutation({
      query: (data) => ({
        url: `${SLOTS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    viewSlots: builder.query({
      query: () => ({
        url: `${SLOTS_URL}/view`,
        method: "GET",
      }),
    }),
    viewSlotById: builder.query({
      query: (data) => ({
        url: `${SLOTS_URL}/view/${data}`,
        method: "GET",
      }),
    }),
    editSlot: builder.mutation({
      query: (data) => ({
        url: `${SLOTS_URL}/edit/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    cancelSlot: builder.mutation({
      query: (data) => ({
        url: `${SLOTS_URL}/cancel/${data}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSlotsMutation,
  useViewSlotsQuery,
  useViewSlotByIdQuery,
  useEditSlotMutation,
  useCancelSlotMutation
} = slotsApiSlice;