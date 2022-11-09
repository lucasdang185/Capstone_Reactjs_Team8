import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios';
import { http } from '../../util/config';
const initialState = {
    userLogin:{}
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    loginAction:(state,action)=>{
        const userLogin=action.payload;
        state.userLogin=userLogin
        console.log(state.userLogin)
    }
  }
});

export const {loginAction} = UserReducer.actions

export default UserReducer.reducer

/// viết hàm async action 

export const loginApi=(userLogin)=>{
        return async dispatch=>{
            const result =await http.post('/api/users/signin', userLogin);
            const action =loginAction(result.data.content);
            dispatch(action);
        }
}
