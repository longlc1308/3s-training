import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        isFetching: false,
        error: false
    },
    reducers: {
       //get users
       getUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getUserSuccess: (state, action) => {
        state.isFetching = false;
        state.products = action.payload;
      },
      getUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
    }
})

export const { getUserStart, getUserSuccess, getUserFailure } = userSlice.actions;
export default userSlice.reducer;