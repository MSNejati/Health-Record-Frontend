import { combineReducers } from "redux";
import message from "./message";
import errors from "./errors";
import auth from "./auth";
import { sidebar } from "./item";

export default combineReducers({
  auth,
  message,
  errors,
  sidebar,
});
