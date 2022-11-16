import React, { useEffect, Fragment } from "react";
import { getApi } from "../redux/Reducer/HomeReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function DanhSachSanPham() {
  const { ProductData } = useSelector((state) => state.HomeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getApi();
    dispatch(action);
  }, []);
  const renderProduct = () => {
    return ProductData.map((pro, index) => {
      return (
        <div className="col-4 my-4" key={index}>
          <div className="card">
            <img src={pro.image} alt="..." />
            <div className="card-body">
              <h3>{pro.name}</h3>
              <p>{pro.description}</p>
              <button className="btn ">
                <NavLink to={`/detail/${pro.id}`}>Buy now</NavLink>
                <span>${pro.price}$</span>
                
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return <Fragment>{renderProduct()}</Fragment>;
}
