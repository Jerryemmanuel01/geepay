import { apiSlice } from "../api/apiSlice";

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
    getTransactionById: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: (result, error, id) => [{ type: "Transactions", id }],
    }),
    addDeposit: builder.mutation({
      query: (data) => ({
        url: "/transactions/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions", "User"],
    }),
    makeWithdrawal: builder.mutation({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions", "User"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useAddDepositMutation,
  useMakeWithdrawalMutation,
} = transactionsApi;
