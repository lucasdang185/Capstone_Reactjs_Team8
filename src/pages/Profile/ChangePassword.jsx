import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changPasswordApi } from '../../redux/Reducer/UserReducer'

export default function ChangePassword() {
const dispatch=useDispatch()
    const frm=useFormik({
        initialValues:{
            newPassword:'',
        },
        onSubmit:(values)=>{
            const action=changPasswordApi(values);
            dispatch(action)
            // console.log(values)
        }
    })
  return (
       <div onSubmit={frm.handleSubmit}>
  <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modalId">Change Password
  </button>
  <div className="modal fade" id="modalId" tabIndex={-1} role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalTitleId">Change Password</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <div className="container-fluid">
          
            <span>Input your new password</span>
            <form >
                <input type="text" id='newPassword' onChange={frm.handleChange} onBlur={frm.handleBlur} style={{border:'none'}}/>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary"onClick={()=>{
            frm.handleSubmit()
          }}>Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
