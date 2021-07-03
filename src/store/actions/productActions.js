import axios from 'axios';
import FormData from 'form-data';
import * as actionTypes from './actionTypes';

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

        axios.post("http://localhost:3001/create-product", data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`,
            }
        })
            .then((data) => {
                dispatch(createProductSuccess(data.data.product))
            })
            .catch((error) => {
                console.log("Error: ", error)
                dispatch(createProductFail(error))
            })
    }
}

export function onFetchProducts(params) {
    return dispatch => {
        dispatch(fetchProductStart());

        axios.post("http://localhost:3001/fetch-products", params)
            .then((data) => {
                // console.log("Fetch Product Success: ", data);
                dispatch(fetchProductSuccess(data.data.products))
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

        axios.post("http://localhost:3001/fetch-user-products")
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
        axios.post("http://localhost:3001/edit-product", data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`,
            }
        })
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
        axios.post("http://localhost:3001/delete-product", params)
            .then((data) => {
                dispatch(deleteProductSuccess(data.data.id))
            })
            .catch((error) => {
                dispatch(deletetProductFail(error))
                console.log("Delete Product Error: ", error)
            })
    }
}