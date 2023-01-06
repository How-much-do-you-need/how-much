import {IS_VALID_EMAIL, IS_VALID_PASSWORD} from "../typeMessage/typeMessage";

const initialLoginValidState = {
    isEmail: false,
    isPassword: false,
}

export default function loginDataValidReducers(state = initialLoginValidState, action) {
    switch (action.type) {
        case IS_VALID_EMAIL: {
            return {
                ...state,
                isEmail: action.isEmail,
            }
        }
        case IS_VALID_PASSWORD: {
            return {
                ...state,
                isPassword: action.isPassword,
            }
        }

        default:
            return state;
    }
}