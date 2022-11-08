import {configureStore} from '@reduxjs/toolkit';
import HomeReducer from './Reducer/HomeReducer';
import UserReducer from './Reducer/UserReducer';
export const store = configureStore({
    reducer:{
        HomeReducer:HomeReducer,
        UserReducer:UserReducer
    }
})