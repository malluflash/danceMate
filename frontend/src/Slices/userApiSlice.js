import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
        credentials: 'include'
      }),
    }),
    superAdminLogin: builder.mutation({
      query: (data) => ({
        url: `/api/superadmin/auth`,
        method: "POST",
        body: data,
        credentials: 'include'
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: 'include'
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
        credentials: 'include'
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: 'include'
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSuperAdminLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
