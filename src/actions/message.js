import {
    CREATE_MESSAGE,
    GET_ERRORS,
} from "./types";

export const sendMessage = (msg, status) => {
    return {
        type: CREATE_MESSAGE,
        payload: { msg, status }
    };
};

export const sendErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    };
};
