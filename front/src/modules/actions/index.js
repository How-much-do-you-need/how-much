import {IS_VALID_EMAIL, IS_VALID_PASSWORD, LOGIN_EMAIL, LOGIN_PASSWORD, MESSAGE_EMAIL, MESSAGE_PASSWORD, LOGIN_STATUS, REGISTER_ID, REGISTER_PASSWORD, REGISTER_NICKNAME} from "../typeMessage/typeMessage";

export const isValidEmail = (isEmail) => ({
    type: IS_VALID_EMAIL,
    isEmail,
});

export const isValidPassword = (isPassword) => ({
    type: IS_VALID_PASSWORD,
    isPassword,
})

export const setEmailMessage = (emailMessage) => ({
    type: MESSAGE_EMAIL,
    emailMessage,
})
export const setPasswordMessage = (passwordMessage) => ({
    type: MESSAGE_PASSWORD,
    passwordMessage,
})

export const loginEmail = typedEmail => ({
    type: LOGIN_EMAIL,
    typedEmail,
});

export const loginPassword = typedPassword => ({
    type: LOGIN_PASSWORD,
    typedPassword,
});

export const checkLoginStatus = status => ({
    type: LOGIN_STATUS,
    status,
});

export const registerId = (regId) => ({
    type: REGISTER_ID,
    regId,
});

export const regiserPassword = (regPasword) => ({
    type: REGISTER_PASSWORD,
    regPasword,
});

export const registerNickName = (regNickName) => ({
    type: REGISTER_NICKNAME,
    regNickName,
});