import { SIDEBAR_TOGGLE } from "../actions/types";

export function sidebar(state = { active: false }, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        active: !state.active,
      };

    default:
      return state;
  }
}
