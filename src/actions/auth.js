import axios from "axios";
import { sendErrors } from "./message";
import { userAPI } from "../apis/requests";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ACCESS_TOKEN,
  NO_USER_FOUND,
  LOGOUT_SUCCESS,
} from "./types";

const setToken = (getState) => {
  const token = getState().auth.access;
  if (token) {
    axios.defaults.headers = { Authorization: "Bearer " + token };
    return true;
  }
  return false;
};

export const loadUser = () => (dispatch, getState) => {
  if (!setToken(getState)) {
    dispatch({
      type: NO_USER_FOUND,
    });
    return;
  }
  axios
    .get(userAPI("RETRIEVE"))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(sendErrors(err.response.data, err.response.status));
      axios
        .post(userAPI("REFRESH"), {
          refresh: localStorage.getItem("ref_token"),
        })
        .then((res) => {
          dispatch({
            type: GET_ACCESS_TOKEN,
            payload: res.data,
          });
          if (!setToken(getState)) {
            dispatch({
              type: NO_USER_FOUND,
            });
            return;
          }
          axios.get(userAPI("RETRIEVE")).then((res) => {
            dispatch({
              type: USER_LOADED,
              payload: res.data,
            });
          });
        })
        .catch((err) => {
          dispatch(sendErrors(err.response.data, err.response.status));
          dispatch({
            type: LOGIN_FAIL,
          });
        });
    });
};

export const login = (user) => (dispatch, getState) => {
  axios
    .post(userAPI("LOGIN"), user)
    .then((res) => {
      dispatch({ type: USER_LOADING });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      if (!setToken(getState)) {
        dispatch({
          type: NO_USER_FOUND,
        });
        return;
      }
      axios.get(userAPI("RETRIEVE")).then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      });
    })
    .catch((err) => {
      dispatch(sendErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch) => {
  axios
    .post(userAPI("LOGOUT"), {
      refresh: localStorage.getItem("ref_token"),
    })
    .then((res) =>
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      })
    );
};

export const addPatient = (patient) => (dispatch) => {
  axios.post(userAPI("MANAGE_PATIENTS"), patient).catch((err) => {
    dispatch(sendErrors(err.response.data, err.response.status));
  });
};

export const addDoctor = (doctor) => (dispatch) => {
  axios.post(userAPI("MANAGE_DOCTORS"), doctor).catch((err) => {
    dispatch(sendErrors(err.response.data, err.response.status));
  });
};
