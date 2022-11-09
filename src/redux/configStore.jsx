import {configureStore} from '@reduxjs/toolkit';
import HomeReducer from './Reducer/HomeReducer';
import UserReducer from './Reducer/UserReducer';
import productReducer from './Reducer/productReducer'
export const store = configureStore({
    reducer:{
        HomeReducer:HomeReducer,
        UserReducer:UserReducer,
        productReducer:productReducer
    }
})