import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import axios from 'axios';
import { ACCESSTOKEN, http, settings, USER_LOGIN ,USER_REGISTER} from '../../util/config';
const initialState = {

  //nếu localStorage có dữ liệu -> load dữ liệu default cho state.userLogin của redux, nếu localStorage không có thì  gán object:{}
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN):{},
    userRegister:{}
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    loginAction:(state,action)=>{
        const userLogin=action.payload;
        state.userLogin=userLogin
        console.log(state.userLogin)
    },
    registerAction:(state,action)=>{
      const userRegister=action.payload;
      state.userRegister=userRegister
      console.log(state.userRegister)
    }
  }
});

export const {loginAction,registerAction} = UserReducer.actions

export default UserReducer.reducer

/// viết hàm async action 

/**
 * 
 * @param {*} userLogin userLogin :{email:'', password:''}
 * @returns   trả về loại 2 action =(dispatch)=>{}
 */

export const loginApi=(userLogin)=>{
        return async dispatch=>{
            const result =await http.post('/api/users/signin', userLogin);
            const action =loginAction(result.data.content);
            dispatch(action);
            //lưu vào localStorage và Cookie
            settings.setStorageJson(USER_LOGIN,result.data.content);
            settings.setStorage(ACCESSTOKEN,result.data.content.accessToken);
            settings.setCookie(ACCESSTOKEN,result.data.content.accessToken);
        }
}


export const loginFaceBook=(tokenFBApp)=>{
  return async dispatch=>{
    const result =await http.post('/api/Users/facebooklogin',{facebookToken:tokenFBApp});
    const action =loginAction(result.data.content);
            dispatch(action);
            //lưu vào localStorage và Cookie
            settings.setStorageJson(USER_LOGIN,result.data.content);
            settings.setStorage(ACCESSTOKEN,result.data.content);
            // settings.setCookie(ACCESSTOKEN,result.data.content);
  }

}

export const registerApi=(userRegister)=>{
  return async dispatch=>{
    const result=await http.post('/api/Users/signup',userRegister)
    const action= registerAction(result.data.content);
    dispatch(action);
    //lưu vào localStorage và Cookie
    settings.setStorageJson(USER_REGISTER,result.data.content);
    settings.setStorage(ACCESSTOKEN,result.data.content.accessToken);
    settings.setCookie(ACCESSTOKEN,result.data.content.accessToken);
  }
}