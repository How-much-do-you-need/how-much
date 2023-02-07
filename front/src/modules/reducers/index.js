import { combineReducers } from "redux";
import loginReducer from './login';
import loginDataValidReducers from './loginDataValid';
import messageDataReducer from "./messageData";
import loginStatusReducer from "./loginStatus";
import registerReducer from "./register";

const rootReducer = combineReducers({
    loginData: loginReducer,
    isLoginValid: loginDataValidReducers,
    loginMsg: messageDataReducer,
    loginStatus: loginStatusReducer,
    userRegiser: registerReducer,
});

export default rootReducer;