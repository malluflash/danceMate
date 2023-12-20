import { apiSlice } from "./apiSlice";

const ADMIN_URL = "api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userTable: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/userlist`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ADMIN_URL}/userstatus/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUserTableQuery, useEditUserMutation } = adminApiSlice;
