import { useFormik } from 'formik';
import * as yup from 'yup'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  changPass, changPasswordApi, getApiProfile, setComponentAction, userUpdateApi } from '../../redux/Reducer/UserReducer';
import ChangePassword from './ChangePassword';
export default function Profile() {
  // const {userProfile}=useSelector(state=>state.UserReducer);
  const { userProfile, userUpdate, newPassword } = useSelector(state => state.UserReducer)
  console.log(userProfile)
  const dispatch = useDispatch();
  const frm = useFormik({
    enableReinitialize:true,
    initialValues: {
      email:userProfile.email,
      name:userProfile.name,
      phone:userProfile.phone,
      gender:""
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email("Email  number is not valid !"),
      phone: yup.string().required().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid !'),
      name: yup.string().required().matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, 'Name is not valid !')}
    ),
    onSubmit: (values) => {
      const action = userUpdateApi(values);
      dispatch(action);
      console.log(values)  
    }
  })

  return (
    <div className='container' onSubmit={frm.handleSubmit}>
      <h1>Profile</h1>
      <div className="row">
        <div className="col1 col-2 ">
          <img src="https://i.pravatar.cc" alt="..." className='w-100' />
        </div>
        <div className="col2 col-4 ">
          <form className='email'>
            <p>Email</p>
            <input type="email" id='email' value={frm.values.email} className='form-control' placeholder='Email' onChange={frm.handleChange} onBlur={frm.handleBlur}   />
            {frm.errors.email ? <p className='text text-danger'>{frm.errors.email}</p> :''}
          </form>
          <br />
          <form className='name'>
            <p>Name</p>
            <input type="text" id='name' className='form-control' value={frm.values.name} placeholder='Name'onChange={frm.handleChange}  onBlur={frm.handleBlur}   />
            {frm.errors.name ? <p className=' text text-danger'>{frm.errors.name}</p> : ''}
          </form>
        </div>
        <div className="col3  col-4 ">
        <form className='phone' >
            <p>Phone</p>
            <input type="text" id='phone' className='form-control' placeholder='Phone' value={frm.values.phone} onChange={frm.handleChange} onBlur={frm.handleBlur} />
            {frm.errors.phone ? <p className=' text text-danger'>{frm.errors.phone}</p> : ''}
          </form>
          <br />
          <br />
          <br />
         <ChangePassword/>
          <br />
          <br />
          <form className='gender'>
          <label className="form-check-label" >
              <span>Gender</span>
              <input
                  type="radio"
                  name="gender"
                  id=""
                  value='true'
                  onChange={frm.handleChange}
                  checked={frm.values.gender}
                />
                <span className='male'>Male</span>
                <input
                  type="radio"
                  name="gender"
                  id=""
                  value='false'
                  onChange={frm.handleChange}
                  checked={frm.values.gender}  

                />
                <span className='male'>Female</span>
                </label>
          </form>
          <button className='btnProfile' onClick={() => {
              frm.handleSubmit()
            }}>Submit</button>
        </div>
      </div>


    </div>
  )
}
