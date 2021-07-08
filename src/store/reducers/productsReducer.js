import * as actionTypes from './../actions/actionTypes';

const initialState = {
    loading: false,
    error: "",
    products: [],
    userproducts: []
}

const products_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PRODUCT_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.CREATE_PRODUCT_SUCCESS: {
            const oldProducts = [...state.products];
            const afterCreateProductSuccess = [...oldProducts, action.payload];

            return {
                ...state,
                products: afterCreateProductSuccess,
                loading: false,
            }
        }
        case actionTypes.CREATE_PRODUCT_FAIL: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }

        case actionTypes.FETCH_PRODUCT_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        }
        case actionTypes.FETCH_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case actionTypes.FETCH_USER_PRODUCT_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_USER_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                userproducts: action.payload
            }
        }
        case actionTypes.FETCH_USER_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case actionTypes.EDIT_PRODUCT_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.EDIT_PRODUCT_SUCCESS: {
            const previoiusProducts = [...state.products];
            const editedProducts = previoiusProducts.filter((item) => item._id !== action.payload._id);
            const productsAfterEdit = [...editedProducts, action.payload];
            return {
                ...state,
                loading: false,
                products: productsAfterEdit
            }
        }
        case actionTypes.EDIT_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case actionTypes.DELETE_PRODUCT_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.DELETE_PRODUCT_SUCCESS: {
            const previousProducts = [...state.products];
            const afterDeleteProduct = previousProducts.filter(item => item._id !== action.payload);

            return {
                ...state,
                products: afterDeleteProduct,
                loading: false
            }
        }
        case actionTypes.DELETE_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        default:
            return state;
    }
}

export default products_reducer;