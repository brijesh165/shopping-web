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

        axios.post("http://localhost:3001/login", params)
            .then((data) => {
                if (data.data.status === 200) {
                    console.log("Data: ", data.data.user)
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("username", data.data.user.username);
                    localStorage.setItem("role", data.data.user.role);
                    localStorage.setItem("user_id", data.data.user._id);
                    localStorage.setItem("userLoggedIn", true);
                    dispatch(loginSuccess({ token: data.data.token, currentUser: data.data.user }));
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
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role")
        localStorage.removeItem("user_id");
        localStorage.removeItem("userLoggedIn");
        dispatch(logout())
    }
}
