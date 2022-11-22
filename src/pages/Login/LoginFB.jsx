import React from 'react'
// import FacebookLogin from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch } from 'react-redux'
import { loginFaceBook } from '../../redux/Reducer/UserReducer'
export default function LoginFB() {
    const dispatch=useDispatch()
    const responseFacebook = (response) => {
        console.log(response)
        const action =loginFaceBook(response.accessToken);
        dispatch(action);
      }
  return (
    <div>
         <FacebookLogin
            appId="673324341077236"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
            //   <button onClick={renderProps.onClick}>This is my custom FB button</button>
             <button className='fb'  onClick={renderProps.onClick}>
            <i class="fa-brands fa-facebook"></i>
            <p>Continue with FaceBook</p>
          </button> 
            )}
          />
    </div>
  )
}
