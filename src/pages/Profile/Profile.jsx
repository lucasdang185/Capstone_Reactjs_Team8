import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getApiProfile } from '../../redux/Reducer/UserReducer';
export default function Profile() {
  const { userProfile } = useSelector(state => state.UserReducer)
  console.log(userProfile)
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getApiProfile();
    dispatch(action)
  }, [])
  return (
    <div className='container'>
      <h1>Profile</h1>
      <div className="row">
        <div className="col1 col-2 ">
          <img src="https://i.pravatar.cc" alt="..." className='w-100' />
        </div>
        <div className="col2 col-4 ">
          <form className='email'>
            <p>Email</p>
            <input type="email" id='email' className='form-control' placeholder='Email' value={userProfile.email} />
          </form>
          <br />
          <form className='name'>
            <p>Name</p>
            <input type="text" id='name' className='form-control' placeholder='Name' value={userProfile.name} />
          </form>
        </div>
        <div className="col3  col-4 ">
          <form className='phone'>
            <p>Phone</p>
            <input type="number" id='phone' className='form-control' placeholder='Phone' value={userProfile.phone} />
          </form>
          <br />
          <form className='password'>
            <p>Password</p>
            <input type="password" id='password' className='form-control' placeholder='Password'  />
          </form>
          <br />
          <br />
          <form className='gender'>
            <label className="form-check-label"  >
              <span>Gender</span>
              <input
                type="radio"
                name="gender"
                id=""
                value={userProfile.gender}
              />
              <span className='male'>Male</span>
              <input
                type="radio"
                name="gender"
                id=""
                value={userProfile.gender}
              />
              <span className='male'>Female</span>
            </label>
          </form>
          <button className='btn'>Update</button>
        </div>
      </div>
    </div>
  )
}
