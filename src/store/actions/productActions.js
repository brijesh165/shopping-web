import axios from 'axios';
import FormData from 'form-data';
import * as actionTypes from './actionTypes';
import * as actions from './index';

const api = "http://localhost:3001";
const { token } = JSON.parse(localStorage.getItem("userDetails"));
const configForForm = {
    headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data/application/json`,
        'authorization': `Bearer ${token}`
    }
}

const configForFetch = {
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    }
}

export function createProductStart() {
    return {
        type: actionTypes.CREATE_PRODUCT_START
    }
}
export function createProductSuccess(params) {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: params
    }
}
export function createProductFail(error) {
    return {
        type: actionTypes.CREATE_PRODUCT_FAIL,
        payload: error
    }
}

export function fetchProductStart() {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    }
}
export function fetchProductSuccess(params) {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        payload: params
    }
}
export function fetchProductFail(error) {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        payload: error
    }
}

export function fetchUserProductStart() {
    return {
        type: actionTypes.FETCH_USER_PRODUCT_START
    }
}
export function fetchUserProductSuccess(params) {
    return {
        type: actionTypes.FETCH_USER_PRODUCT_SUCCESS,
        payload: params
    }
}
export function fetchUserProductFail(error) {
    return {
        type: actionTypes.FETCH_USER_PRODUCT_FAIL,
        payload: error
    }
}

export function editProductStart() {
    return {
        type: actionTypes.EDIT_PRODUCT_START
    }
}
export function editProductSuccess(params) {
    return {
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        payload: params
    }
}
export function editProductFail(error) {
    return {
        type: actionTypes.EDIT_PRODUCT_FAIL,
        payload: error
    }
}

export function deleteProductStart() {
    return {
        type: actionTypes.DELETE_PRODUCT_START
    }
}
export function deleteProductSuccess(params) {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload: params
    }
}
export function deletetProductFail(error) {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        payload: error
    }
}

export function oncreateproduct(params) {
    return dispatch => {
        dispatch(createProductStart())

        let data = new FormData();
        data.append('product_name', params.form.name);
        data.append('category', params.form.category);
        data.append('subcategory', params.form.subcategory);
        data.append('price', params.form.price);
        data.append('description', params.form.description);
        data.append('image', params.form.image, params.form.image.name);
        data.append('status', params.form.status);
        data.append('user_id', params.user_id);

        axios.post(`${api}/create-product`, data, configForForm)
            .then((data) => {
                dispatch(createProductSuccess(data.data.product))
            })
            .catch((error) => {
                console.log("Error: ", error)
                dispatch(createProductFail(error))
            })
    }
}

export function onFetchProducts(user_id) {
    return dispatch => {
        dispatch(fetchProductStart());
        const data = {
            "user_id": user_id
        }
        console.log("Params: ", data)
        axios.post(`${api}/fetch-products`, data, configForFetch)
            .then((data) => {
                console.log("Fetch Product Success: ", data);
                if (data.data.status === 200) {
                    dispatch(fetchProductSuccess(data.data.products))
                } else if (data.data.status === "error") {
                    dispatch(actions.onLogout())
                }
            })
            .catch((error) => {
                console.log("Fetch Product Error: ", error);
                dispatch(fetchProductFail(error))
            })
    }
}

export function onFetchProductsForUsers() {
    return dispatch => {
        dispatch(fetchUserProductStart());

        axios.get(`${api}/fetch-user-products`, configForFetch)
            .then((data) => {
                // console.log("Data: ", data.data.products)
                dispatch(fetchUserProductSuccess(data.data.products))
            })
            .catch((error) => {
                console.log("Error: ", error);
                dispatch(fetchUserProductFail(error))
            })
    }
}

export function onEditproduct(params) {
    return dispatch => {
        dispatch(editProductStart());
        // console.log("Edit Action Params: ", params)
        let data = new FormData();

        data.append('_id', params.id)
        data.append('product_name', params.form.name);
        data.append('category', params.form.category);
        data.append('subcategory', params.form.subcategory);
        data.append('price', params.form.price);
        data.append('description', params.form.description);
        data.append('image', params.form.image, params.form.image.name);
        data.append('status', params.form.status);
        data.append('user_id', params.user_id);
        axios.post(`${api}/edit-product`, data, configForForm)
            .then((data) => {
                // console.log("Edit Data: ", data.data)
                dispatch(editProductSuccess(data.data.product))
            })
            .catch((error) => {
                dispatch(editProductFail(error))
                console.log("Edit Product Error: ", error)
            })
    }
}

export function onDeleteproduct(params) {
    return dispatch => {
        dispatch(deleteProductStart());
        axios.post(`${api}/delete-product`, params, configForFetch)
            .then((data) => {
                dispatch(deleteProductSuccess(data.data.id))
            })
            .catch((error) => {
                dispatch(deletetProductFail(error))
                console.log("Delete Product Error: ", error)
            })
    }
}