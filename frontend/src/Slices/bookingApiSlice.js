import { apiSlice } from "./apiSlice";

const BOOKINGS_URL = "api/bookings"; 

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    viewBookings: builder.query({
      query: () => ({
        url: `${BOOKINGS_URL}/view`,
        method: "GET",
      }),
    }),
    viewSchedule: builder.query({
      query: () => ({
        url: `${BOOKINGS_URL}/schedule`,
        method: "GET",
      }),
    }),
    cancelBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}/cancel/${data}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useViewScheduleQuery,
  useViewBookingsQuery,
  useCancelBookingMutation,
} = bookingsApiSlice;