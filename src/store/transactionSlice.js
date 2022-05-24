import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: false,
        error: false,
        data: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const { setLoading, setError, setData } = transactionsSlice.actions;

export const getTransactions = () => async dispatch => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get('https://recruitment-test.flip.id/frontend-test');
      dispatch(setData(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log('error', error);
      dispatch(setError(true));
    }
  };
  
  export default transactionsSlice.reducer;