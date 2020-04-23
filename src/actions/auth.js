import axios from "axios";
import { sendErrors, sendMessage } from "./message";
import { userAPI } from "../apis/requests";
import {
  USER_LOADING,
  USER_LOADED,
  //   AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ACCESS_TOKEN,
  NO_USER_FOUND,
} from "./types";

export const setToken = (getState) => {
  const token = getState().auth.access;
  if (token) {
    axios.defaults.headers = { Authorization: "Bearer " + token };
    return true;
  }
  return false;
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
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
