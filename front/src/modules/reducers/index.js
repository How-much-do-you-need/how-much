import { combineReducers } from "redux";
import loginReducer from './login';
import loginDataValidReducers from './loginDataValid';
import messageDataReducer from "./messageData";


const rootReducer = combineReducers({
    loginData: loginReducer,
    isLoginValid: loginDataValidReducers,
    loginMsg: messageDataReducer,
});

export default rootReducer;