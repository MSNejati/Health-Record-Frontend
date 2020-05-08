import { SIDEBAR_TOGGLE } from "./types";

export const Toggle = () => (dispatch) => {
  dispatch({ type: SIDEBAR_TOGGLE });
};
