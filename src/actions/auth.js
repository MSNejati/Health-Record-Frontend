import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import apiRequest from "../apis/requests";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ACCESS_TOKEN,
  NO_USER_FOUND,
} from "./types";

export const loadUser = () => (dispatch, getState) => {};

export const login = (username, password) => (dispatch, getState) => {};

export const tokenConfig = (getState) => {};
