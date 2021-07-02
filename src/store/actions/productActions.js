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

export function oncreateproduct(params) {
    return dispatch => {
        dispatch(createProductStart())

        let data = new FormData();
        data.append('product_name', params.name);
        data.append('category', params.category);
        data.append('subcategory', params.subcategory);
        data.append('price', params.price);
        data.append('description', params.description);
        data.append('image', params.image, params.image.name);
        data.append('status', params.status)

        console.log("Form Data: ", params.name, data.entries());

        axios.post("http://localhost:3001/create-product", data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`,
            }
        })
            .then((data) => {
                console.log(data.data);
            })
            .catch((error) => {
                console.log("Error: ", error)
            })
    }
}