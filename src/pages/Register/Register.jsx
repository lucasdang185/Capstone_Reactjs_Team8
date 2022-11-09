import React, {useRef, useState } from 'react'
// import {Formik} from 'formik'
export default function Register() {
  
  const useRefRegister=useRef(
    {email:'', password:'', confirmPassword:'', name:'', phone:''}
  )
const [useStateRegister,setUseStateRegister]=useState(
    {email:'', password:'', confirmPassword:'', name:'', phone:''}

  )
  const handleChange=(e)=>{
    let {id, value}=e.target;

   const values= useRefRegister.current[id]=value
    // console.log(useRefRegister.current)  
    setUseStateRegister({...values,values})
    console.log(useStateRegister)

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  
  
    

  return (
    <div className='container' onSubmit={handleSubmit} >
      <h1>Register</h1>
      <hr />
      <div className='row'>
        <div className='col-l col-5'>
          <form className='email'>
            <p>Email</p>
            <input type="email" id='email' className='form-control' placeholder='Email' onChange={handleChange} />
            <p className='text-danger'></p>
          </form>
          <br />
          <form className='password' >
            <p>Password</p>
            <input type="password" id='password' className='form-control' placeholder='Password' onChange={handleChange} />
            <p className='text-danger'></p>
          </form>
          <br />
          <form className='confirmPassword' >
            <p>Confirm Password</p>
            <input type="password" id='confirmPassword' className='form-control' placeholder='Confirm password' onChange={handleChange} />
          </form>
        </div>
        <div className='col-r col-5'>
          <form className='name'>
            <p>Name</p>
            <input type="text" id='name' className='form-control' placeholder='Name' onChange={handleChange} />
          </form>
          <br />
          <form className='phone' >
            <p>Phone</p>
            <input type="number" id='phone' className='form-control' placeholder='Phone' onChange={handleChange} />
          </form>
          <br />
          <br />
          <br />
          <form className='gender'>
            <label className="form-check-label" id="gender">
              <span>Gender</span>
              <input type={'radio'} name="male" id="" value="true" />
              Male
              <input type="radio" name="male" id="" value="false" />
              Female
            </label>
          </form>
          <br />
          <br />
          <div>
            <button className='btn btn-success'onSubmit={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}




