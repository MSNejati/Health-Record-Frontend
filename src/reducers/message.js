import {
  CREATE_MESSAGE,
  LOGOUT_SUCCESS,
  DELETE_MESSAGE,
} from "./../actions/types";

const initialState = {
  msg: {},
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_MESSAGE:
      return {
        msg: {},
        status: null,
      };

    case LOGOUT_SUCCESS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };

    case CREATE_MESSAGE:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
