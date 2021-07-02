import * as actionTypes from './../actions/actionTypes';

const initialState = {
    loading: false,
    token: '',
    role: '',
    username: '',
    loginError: '',
    userLoggedIn: false
}

const user_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: {
            return {
                ...state,
                loginError: "",
                loading: true
            }
        }

        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.currentUser.role,
                username: action.payload.currentUser.username,
                userLoggedIn: true,
                loading: false
            }
        }

        case actionTypes.LOGIN_FAIL: {
            return {
                ...state,
                loginError: action.payload,
                loading: false
            }
        }

        case actionTypes.LOGOUT: {
            return {
                ...state,
                token: '',
                role: '',
                username: '',
                loginError: '',
                userLoggedIn: false
            }
        }

        default:
            return state;
    }
}


export default user_reducer;

