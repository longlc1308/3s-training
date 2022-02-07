import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from 'axios';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
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