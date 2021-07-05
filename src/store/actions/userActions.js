import * as actionTypes from './actionTypes';
import axios from 'axios';

export function loginStart() {
    return {
        type: actionTypes.LOGIN_START
    }
}
export function loginSuccess(params) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: params
    }
}
export function loginFail(error) {
    return {
        type: actionTypes.LOGIN_FAIL,
        payload: error
    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}

export function onLogin(params) {
    return dispatch => {
        dispatch(loginStart());

        // login api call with user information
        axios.post("http://localhost:3001/login", params)
            .then((data) => {
                console.log("Login Data: ", data.data)
                if (data.data.status === 200) {
                    dispatch(loginSuccess({ token: data.data.token, currentUser: data.data.user }))
                } else if (data.data.status === 401) {
                    dispatch(loginFail(data.data.error));
                }
            })
            .catch((error) => {
                console.log("Error", error)
                dispatch(loginFail(error));
            })
    }
}

export function onLogout() {
    return dispatch => {
        localStorage.removeItem("userDetails");
        dispatch(logout())
    }
}
