import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import axios from 'axios';
import { ACCESSTOKEN, http, settings, USER_LOGIN ,USER_REGISTER} from '../../util/config';
const initialState = {

  //nếu localStorage có dữ liệu -> load dữ liệu default cho state.userLogin của redux, nếu localStorage không có thì  gán object:{}
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN):{},
    userRegister:{},
    userProfile:{}
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
    },
    getUserProfileAction:(state,action)=>{
      state.userProfile=action.payload
    }
  }
});

export const {loginAction,registerAction,getUserProfileAction} = UserReducer.actions

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
          //Thay vì sau khi đang nhập xong gọi api get profile thì  logic đó mình đã code ròi =>bây giờ chỉ cần dùng dispatch để gọi lại 
            //dispatch lại logic của 1 action async khác
            const actionGetProfile=getApiProfile();
            dispatch(actionGetProfile);
            //lưu vào localStorage và Cookie
            settings.setStorageJson(USER_LOGIN,result.data.content);
            settings.setStorage(ACCESSTOKEN,result.data.content.accessToken);
            settings.setCookie(ACCESSTOKEN,result.data.content.accessToken,30);
        }
}


export const loginFaceBook=(tokenFBApp)=>{
  return async dispatch=>{
    const result =await http.post('/api/Users/facebooklogin',{facebookToken:tokenFBApp});
    const action =loginAction(result.data.content);
            dispatch(action);
            dispatch(action);
            //Thay vì sau khi đang nhập xong gọi api get profile thì  logic đó mình đã code ròi =>bây giờ chỉ cần dùng dispatch để gọi lại 
              //dispatch lại logic của 1 action async khác
              const actionGetProfile=getApiProfile();
              dispatch(actionGetProfile);
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

export const getApiProfile=()=>{
  return async dispatch=>{
      const result=await http.post('/api/Users/getProfile');
      const action=getUserProfileAction(result.data.content);
      dispatch(action)
  }
}