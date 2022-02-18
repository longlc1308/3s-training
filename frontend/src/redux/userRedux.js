import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
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
        state.users = action.payload;
      },
      getUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },

      // delete user
      deleteUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      deleteUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.splice(
          state.users.findIndex((item) => item._id === action.payload),
        1)
      },
      deleteUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },

      // add user
      addUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      addUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users = [...state.users, action.payload];
      },
      addUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },

      // update user
      updateUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      updateUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users[
          state.users.findIndex((item) => item._id === action.payload._id)
        ] = action.payload;
      },
      updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
    }
})

export const { 
  getUserStart, 
  getUserSuccess, 
  getUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;