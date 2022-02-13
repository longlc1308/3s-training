import { loginFailure, loginStart, loginSuccess } from './authRedux';
import { 
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
  updateUserFailure
} from "./userRedux";
import { persistor } from './store'
import axios from 'axios';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", user);
    dispatch(loginSuccess(res.data.user))
    setTimeout(() => {
      persistor.purge();
    }, res.data.expiresIn);
  } catch (err) {
    console.log(err.response.data.msg)
    dispatch(loginFailure());
  }
}

// add user or register
export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    const res = await axios.post("http://localhost:5000/api/users/register", user);
    dispatch(addUserSuccess(res.data.user._doc));
    alert(res.data.msg)
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.put("http://localhost:5000/api/users/forgot-password", email);
    console.log(res.data)
  } catch (err) {
    console.log(err.response.data.msg)
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await axios.put("http://localhost:5000/api/users/forgot-password/" + token, newPassword);
    console.log(res.data)
  } catch (err) {
    console.log(err.response.data.msg)
  }
}

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    dispatch(getUserSuccess(res.data))
  } catch (err) {
    dispatch(getUserFailure())
  }
}

export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete("http://localhost:5000/api/users/" + id);
    console.log(res.data);
    dispatch(deleteUserSuccess(id))
  } catch (err) {
    dispatch(deleteUserFailure())
  }
}

export const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put("http://localhost:5000/api/users/" + user._id, user);
    console.log(res.data);
    dispatch(updateUserSuccess(user));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};