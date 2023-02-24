import { LOGIN_STATUS } from '../typeMessage/typeMessage';

const defaultLoginStatus = false;

export default function loginStatusReducer(state = defaultLoginStatus, action) {
    switch(action.type) {
        case LOGIN_STATUS: return action.status
        default: 
            return state;
    }
}