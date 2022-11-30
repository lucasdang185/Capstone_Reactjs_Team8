import React, { useRef, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { registerApi } from '../../redux/Reducer/UserReducer'
import { useDispatch } from 'react-redux'
import { history } from '../..'
export default function Register() {
  const {userRegister}=useDispatch(state=>state.UserReducer)
  console.log(userRegister)
  const dispatch = useDispatch()
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email  number is not valid !"),
      phone: yup.string().required().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid !'),
      confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Password's not match")
        .required("Required!"),
      name: yup.string().required().matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, 'Name is not valid !')}
    ),
    onSubmit: (values) => {
      const action = registerApi(values);
      dispatch(action);
      alert('Sign Up Success');
      history.push('/login');
    },  
  })


  return (
    <div className='container' onSubmit={frm.handleSubmit} >
      <h1>Register</h1>
      <hr />
      <div className='row'>
        <div className='col-l col-5'>
          <form className='email'>
            <p>Email</p>
            <input type="email" id='email' className='form-control' placeholder='Email' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.errors.email ? <p className=' text text-danger'>{frm.errors.email}</p> : ''}
          </form>
          <br />
          <form className='password' >
            <p>Password</p>
            <input type="password" id='password' className='form-control' placeholder='Password' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            <p className='text-danger'></p>
          </form>
          <br />
          <form className='confirmPassword' >
            <p>Confirm Password</p>
            <input type="password" id='confirmPassword' className='form-control' placeholder='Confirm password' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.values.password !== frm.values.confirmPassword ? <p className=' text text-danger'>{frm.errors.confirmPassword}</p> : ''}
          </form>
        </div>
        <div className='col-r col-5'>
          <form className='name'>
            <p>Name</p>
            <input type="text" id='name' className='form-control' placeholder='Name' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.errors.name ? <p className=' text text-danger'>{frm.errors.name}</p> : ''}
          </form>
          {/* <br /> */}
          <br />
          <form className='phone' >
            <p>Phone</p>
            <input type="text" id='phone' className='form-control' placeholder='Phone' onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.errors.phone ? <p className=' text text-danger'>{frm.errors.phone}</p> : ''}
          </form>
          <br />
          <br />
          {/* <br /> */}
          <form className='gender'>
            <label className="form-check-label"  >
              <span>Gender</span>
              <input
                  type="radio"
                  name="gender"
                  id=""
                  value="true"
                  onChange={frm.handleChange}
                  checked={frm.values.gender}
                />
                <span className='male'>Male</span>
                <input
                  type="radio"
                  name="gender"
                  id=""
                  value="false"
                  onChange={frm.handleChange}
                  checked={frm.values.gender}
                />
                <span className='male'>Female</span>
                </label>
          </form>
          <br />
          <br />
          <div>
            <button className='btn ' onClick={() => {
              frm.handleSubmit()
            }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}




