import React from 'react'
import { useFormik } from 'formik'
// import yup from 'yup'
import * as yup from 'yup'
import { loginApi } from '../../redux/Reducer/UserReducer';
import {useDispatch} from 'react-redux'
export default function Login() {
  const dispatch=useDispatch()
  const frm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email không đúng định dạng !")
    }),
    onSubmit: (values) => {
      // console.log(values);
      const action= loginApi(values);
      dispatch(action);
    }
  })
  return (
    <form className='container' onSubmit={frm.handleSubmit} >
      <h1>Login</h1>
      <hr />
      <div className='row'>
        <div className="col">
          <div className='email'>
            <p>Email</p>
            <input type="text" name='email' id='email' placeholder='Email' className='' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.errors.email ? <p className=' text text-danger'>{frm.errors.email}</p> : ''}
          </div>
          <br />
          <div className='password'>
            <p>Password</p>
            <input type="password" name='password' id='password' placeholder='Password' onChange={frm.handleChange} />
          </div>
          <div className='registerNow'>
            <h5>Register now ?</h5>
            <button className='btn-login' >LOGIN</button>
          </div>
          <button className='fb' >
            <i class="fa-brands fa-facebook"></i>
            <p>Continue with FaceBook</p>
          </button>
        </div>
      </div>
    </form>
  )
}