import { combineReducers } from "redux";
import message from "./message";
// import errors from "./errors";
import auth from "./auth";

export default combineReducers({
  auth,
  message,
});
