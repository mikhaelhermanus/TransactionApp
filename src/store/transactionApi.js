import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://recruitment-test.flip.id' }),
    endpoints: builder => ({
        getAllTransaction: builder.query({ query: () => '/frontend-test' })
    }),
});

export const {useGetAllTransactionQuery} = transactionsApi