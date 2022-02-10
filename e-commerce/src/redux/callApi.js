import { loginFailure, loginStart, loginSuccess } from './authRedux';
import { getUserStart, getUserSuccess, getUserFailure } from "./userRedux"
import axios from 'axios';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", user);
    dispatch(loginSuccess(res.data.msg));
  } catch (err) {
    console.log(err.response.data.msg)
    dispatch(loginFailure());
  }
}

export const signup = async (user) => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/register", user);
    alert(res.data.msg);
  }
  catch (err) {
    console.log(err);
    alert('Error');
  }
}

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    dispatch(getUserSuccess(res.data))
  } catch (error) {
    dispatch(getUserFailure())
  }
}