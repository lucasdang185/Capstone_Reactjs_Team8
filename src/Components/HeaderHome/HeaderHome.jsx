import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { ACCESSTOKEN, settings, USER_LOGIN } from "../../util/config";
import { history } from '../../index'
import { useEffect } from "react";
export default function HeaderHome() {
  const { userProfile, userLogin } = useSelector(state => state.UserReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  // console.log(userProfile)
  const renderUserLogin = () => {
    if (userLogin.email) {
      return <>
        <div style={{
          display: 'flex'
        }}>
          <div className=" flex-item" >
            <NavLink className={({ isActive }) => isActive ? 'nav-link bg-warning text-white' : 'nav-link'} to='/profile' style={{ textAlign: 'center', borderRadius:'5px' }} >{userProfile.name}</NavLink>
          </div>
          <div className="flex-item">
            <button className='nav-link' style={{ background: 'none', border: 'none' }} onClick={() => {
              settings.eraseCookie(ACCESSTOKEN, 0);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESSTOKEN);
              //Sau khi đăng xuất xong chuyển về trang  login đồng thời reload lại trang clear redux
              window.location.href = '/login';
            }}> Log out</button>
          </div>
        </div>
      </>
    }
    return <NavLink className={({ isActive }) => isActive ? 'nav-link bg-warning text-white' : 'nav-link'} style={{ borderRadius: '5px' }} to='/login'>Login</NavLink>
  };
  useEffect(() => {
    if (userLogin.email) {
      history.push('/profile')
    }
  }, [userProfile]);
  const totalCart = () => {
    console.log({ cart });
    return cart?.reduce((total, prod, index) => {
      return (total += prod.quantity);
    }, 0);
  };
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark "
      style={{ background: "#000" }}
    >
      <NavLink className="navbar-brand" to={'/'}>
        <img src="./img/image 3.png" style={{ padding: 0 }} alt="..." />
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link bg-warning text-white' : 'nav-link'} style={({ isActive }) => isActive ? { color: 'red', borderRadius: '5px' } : {}} to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link bg-warning text-white' : 'nav-link'} style={({ isActive }) => isActive ? { color: 'red', borderRadius: '5px' } : {}} to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item login">{renderUserLogin()}</li>
        </ul>
        <form className="d-flex my-2 my-lg-0">
          <input
            className="form-control me-sm-2"
            type="text"
            placeholder="Search"
          />
          <NavLink className="search-bar" to="/search">
            <i className="fa fa-search"></i>
            Search
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", display: "initial" }}
            className="nav-item text-light px-5 "
            to={"cart"}
          >
            <i className="fa fa-cart-plus fs-5"></i>
            <span>({totalCart()})</span>
          </NavLink>
        </form>
      </div>
    </nav>
  );
}
