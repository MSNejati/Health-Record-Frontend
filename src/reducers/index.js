import { combineReducers } from "redux";
// import doctors from "./doctors";
// import errors from "./errors";
import message from "./message";
import auth from "./auth";

export default combineReducers({
  auth,
  message,
});
