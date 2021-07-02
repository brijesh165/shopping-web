import * as actionTypes from './../actions/actionTypes';

const initialState = {
    loading: false,
    error: "",
    products: []
}

const products_reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default products_reducer;