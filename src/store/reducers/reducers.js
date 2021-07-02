import { combineReducers } from 'redux';

import user_reducer from './userReducer';
import products_reducer from './productsReducer';

const rootReducer = combineReducers({
    users: user_reducer,
    products: products_reducer
})

export default rootReducer;