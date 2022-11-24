import { useFormik } from 'formik';
import moment from "moment";
import * as yup from 'yup'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  changPass, changPasswordApi, getApiProfile, setComponentAction, userUpdateApi } from '../../redux/Reducer/UserReducer';
import ChangePassword from './ChangePassword';
import { ACCESSTOKEN, settings, USER_LOGIN } from "../../util/config";

export default function Profile() {
  // const {userProfile}=useSelector(state=>state.UserReducer);
  const { userLogin,userProfile, userUpdate, newPassword } = useSelector(state => state.UserReducer)
  console.log(userProfile)
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getApiProfile(settings.getStorage(ACCESSTOKEN));
    dispatch(action);
  }, [userProfile]);

  const renderOrderHistory = () => {
    return userProfile?.ordersHistory?.map((order, index) => {
      return (
        <div className="orderHistory mt-2" key={index}>
          <h4>
            + Orders have been placed on{" "}
            {moment(order?.date).format("DD/MM/YYYY hh:mm:ss A")}
          </h4>
          <table className="table">
            <thead className='history-bar'>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>img</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderDetail.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{item.name} </td>
                    <td>
                      <img src={item.image} width={50} alt="..." />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };
 
  const frm = useFormik({
    enableReinitialize:true,
    initialValues: {
      email:userProfile.email,
      name:userProfile.name,
      phone:userProfile.phone,
      gender:userProfile.gender,
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email("Email  number is not valid !"),
      phone: yup.string().required().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid !'),
      name: yup.string().required().matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, 'Name is not valid !')}
    ),
    onSubmit: (values) => {
      const action = userUpdateApi(values);
      dispatch(action);
      alert('Update successful')
      // settings.eraseCookie(ACCESSTOKEN,0);
      localStorage.removeItem(USER_LOGIN); 
      localStorage.removeItem(ACCESSTOKEN);
      window.location.href='/login';
      // console.log(values)  
    }
  })
  
  // useEffect=(()=>{

  // },[userProfile.ordersHistory])

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
                  // checked={frm.values.gender}
                />
                <span className='male'>Male</span>
                <input
                  type="radio"
                  name="gender"
                  id=""
                  value='false'
                  onChange={frm.handleChange}
                  // checked={frm.values.gender}  

                />
                <span className='male'>Female</span>
                </label>
          </form>
          <button className='btnProfile' onClick={() => {
              frm.handleSubmit()
            }}>Update</button>
        </div>
      </div>
      <hr />
      <div className="">
        <button className="btn btn-success text-light">Order history</button>
      </div>
      {renderOrderHistory()}
    </div>
  )
}
