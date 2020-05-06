import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ACCESS_TOKEN,
  NO_USER_FOUND,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("acc_token"),
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("ref_token", action.payload.refresh);
      localStorage.setItem("acc_token", action.payload.access);
      return {
        ...state,
        access: action.payload.access,
        isAuthenticated: true,
        isLoading: true,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("acc_token");
      localStorage.removeItem("ref_token");
      return {
        ...state,
        access: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case GET_ACCESS_TOKEN:
      localStorage.setItem("acc_token", action.payload.access);
      return {
        ...state,
        access: action.payload.access,
      };
    case NO_USER_FOUND:
      return {
        ...state,
        access: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
