import { DELETE_ERROR, GET_ERRORS } from "../actions/types";

const initialState = {
  msg: null,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case DELETE_ERROR:
      return {
        msg: null,
        status: null,
      };
    default:
      return state;
  }
}
