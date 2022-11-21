import axios from "axios"
import {history} from '../index'
export const USER_LOGIN ='userLogin';
export const ACCESSTOKEN='accessToken';
export const USER_REGISTER='userRegister';
export const USER_PROFILE='userProfile'


export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMyIsIkhldEhhblN0cmluZyI6IjA4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MDkxMjAwMDAwMCIsIm5iZiI6MTY1Mjg5MzIwMCwiZXhwIjoxNjgxMDU5NjAwfQ.YWfEjzumDyUA3XRRvMIkDiD1cOGgRKyAAeOTP3qTT2c'

export const settings = {
    setStorageJson: (name, data) => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);   
    },
    setStorage: (name, data) => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name) => {
        if (localStorage.getItem(name)) {
            const data = JSON.parse(localStorage.getItem(name))
            return data
        }
        return;//undefined
    },
    getStorage: (name) => {
        if (localStorage.getItem(name)) {
            const data = (localStorage.getItem(name))
            return data
        }
        return;//undefined
    },
    setCookieJson:(name,value,days)=>{   
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        value=JSON.stringify(value)
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
     setCookie:(name,value,days)=> {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookieLJson:(name)=> {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
     eraseCookie:(name)=> {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    getCookieL:(name)=> {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) 
            return JSON.parse( c.substring(nameEQ.length,c.length));
        }
        return null;
    },
     eraseCookie:(name)=> {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn',
    timeout: 30000
})


// cấu hình cho request: Client gửi aip đến sever

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization :'Bearer '+settings.getStorage(ACCESSTOKEN)
    }
    return config;


}, err => {
    console.log(err)
    return Promise.reject(err);
})

// cấu hình cho response : sever sẽ trả dữ liệu về cho client
http.interceptors.response.use((response)=>{
    return response;

}, (error)=>{
    //Thất bại của tất cả request sử dụng http sẽ trả vào đây   
    console.log(error)
    if(error.response.status===401){
        //chuyển hướng trang mà không cần reload loai trang để giữ lại các state hiện tại trên redux
        history.push('/login');
    }
    if(error.response?.status===404){
        history.push('/');
    }
    return Promise.reject(error);
})
