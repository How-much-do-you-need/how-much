import { LOGIN_EMAIL, LOGIN_PASSWORD } from "../typeMessage/typeMessage";
const initialLoginState = {
    email: "",
    password: undefined,
}

export default function loginReducer(state = initialLoginState, action) {
    switch (action.type) {
        case LOGIN_EMAIL: {
            return {
                ...state,
                email: action.typedEmail,
            }
        }

        case LOGIN_PASSWORD: {
            return {
                ...state,
                password: action.typedPassword,
            }

        }
        default:
            return state;
    }
}