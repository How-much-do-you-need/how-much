import { REGISTER_ID, REGISTER_PASSWORD, REGISTER_NICKNAME, REGISTER_NAME, REGISTER_PHONE, REGISTER_BIRTH_DAY, REGISTER_SEX } from "../typeMessage/typeMessage";

const initialRegister = {
    regEmail: "",
    regPassword: undefined,
    regNickname: "",
    regName: "",
    regPhone: "",
    regBirthDay: "",
    regSex: "",
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

        case REGISTER_NAME: {
            return {
                ...state,
                regName: action.regName,
            }
        }

        case REGISTER_PHONE: {
            return {
                ...state,
                regPhone: action.regPhone,
            }
        }

        case REGISTER_BIRTH_DAY: {
            return {
                ...state,
                regBirthDay: action.regBirthDay,
            }
        }

        case REGISTER_SEX: {
            return {
                ...state,
                regSex: action.regSex,
            }
        }

        default:
            return state;
    }
}