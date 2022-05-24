import { configureStore } from "@reduxjs/toolkit";

import { transactionsApi } from "./transactionApi";

const store = configureStore({
    reducer : {
        [transactionsApi.reducerPath]:  transactionsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(transactionsApi.middleware),
})

export default store