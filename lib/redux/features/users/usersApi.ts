import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    updateTransactionPin: builder.mutation({
      query: (data) => ({
        url: "/users/profile/pin",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUnapprovedUsers: builder.query({
      query: () => "/users/unapproved",
      providesTags: ["UnapprovedUsers"],
    }),
    approveUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["UnapprovedUsers", "User"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateTransactionPinMutation,
  useGetUnapprovedUsersQuery,
  useApproveUserMutation,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
} = usersApi;
