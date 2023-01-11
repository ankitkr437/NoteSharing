import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const RegisterCall = async (userCredential,dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("https://notesharingbackend-ankitkr437.onrender.com/api/auth/register", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
 
 

