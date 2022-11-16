import React from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux'
import { ACCESSTOKEN, settings, USER_LOGIN } from "../../util/config";
export default function HeaderHome() {
  const {userProfile}=useSelector(state=>state.UserReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  console.log(userProfile)
  const renderUserLogin=()=>{
    if(userProfile.email){
      return <>
      <NavLink className='nav-link' to ='/profile'> {userProfile.name}</NavLink>
      <button className='nav-link' style={{background:'none', border:'none'}} onClick={()=>{
        settings.eraseCookie(ACCESSTOKEN,0);
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(ACCESSTOKEN);
        //Sau khi đăng xuất xong chuyển về trang  login đồng thời reload lại trang clear redux
        window.location.href='/login';
      }}> Đăng xuất</button>
      </>
    }
    return <NavLink className='nav-link' to='/login'>Login</NavLink>
  };


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
      <a className="navbar-brand" href="#">
        <img src="./img/image 3.png" style={{ padding: 0 }} alt="..." />
      </a>
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
            <NavLink
              className="nav-link active"
              to={"/home"}
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item login">{renderUserLogin()}</li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="#">
                Action 1
              </a>
              <a className="dropdown-item" href="#">
                Action 2
              </a>
            </div>
          </li>
        </ul>
        <form className="d-flex my-2 my-lg-0">
          <input
            className="form-control me-sm-2"
            type="text"
            placeholder="Search"
          />
          {/* <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button> */}
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
