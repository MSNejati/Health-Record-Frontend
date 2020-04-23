import { GET_ERRORS, CREATE_MESSAGE, LOGOUT_SUCCESS } from "./../actions/types";

const initialState = {
  messages: null,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    case CREATE_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}
