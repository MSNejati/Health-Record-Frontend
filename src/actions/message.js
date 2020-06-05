import {
  CREATE_MESSAGE,
  GET_ERRORS,
  DELETE_ERROR,
  DELETE_MESSAGE,
} from "./types";

export const sendMessage = (msg, status) => {
  return {
    type: CREATE_MESSAGE,
    payload: { msg, status },
  };
};

export const sendErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const deleteErrors = () => (dispatch) => {
  dispatch({
    type: DELETE_ERROR,
  });
};

export const deleteMessage = () => (dispatch) => {
  dispatch({
    type: DELETE_MESSAGE,
  });
};
