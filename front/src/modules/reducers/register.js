import { REGISTER_ID, REGISTER_PASSWORD, REGISTER_NICKNAME } from "../typeMessage/typeMessage";

const initialRegister = {
    regEmail: "",
    regPassword: undefined,
    regNickname: "",
}

export default function registerReducer(state = initialRegister, action) {
    switch (action.type) {
        case REGISTER_ID: {
            return {
                ...state,
                regEmail: action.regId,
            }
        }

        case REGISTER_PASSWORD: {
            return {
                ...state,
                regPassword: action.regPasword,
            }

        }

        case REGISTER_NICKNAME: {
            return {
                ...state,
                regNickname: action.regNickName
            }
        }
        default:
            return state;
    }
}