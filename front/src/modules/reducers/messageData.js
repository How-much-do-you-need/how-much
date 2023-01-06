import { MESSAGE_EMAIL, MESSAGE_PASSWORD } from "../typeMessage/typeMessage";

const initialMessageState = {
    emailMessage: "",
    passwordMessage: "",
}

export default function messageDataReducer(state = initialMessageState, action) {
    switch (action.type) {
        case MESSAGE_EMAIL: {
            return {
                ...state,
                emailMessage: action.emailMessage,
            }
        }

        case MESSAGE_PASSWORD: {
            return {
                ...state,
                passwordMessage: action.passwordMessage,
            }
        }

        default:
            return state;
    }
}