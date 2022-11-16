import React, { useEffect } from "react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByKeywordApi,
  setArrProductBySort,
} from "../../redux/Reducer/searchProductReducer";
import { NavLink } from "react-router-dom";

export default function Search() {
  //
  const [searchParams, setSearchParams] = useSearchParams();
  const { arrProduct } = useSelector((state) => state.searchProductReducer);
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const action = getProductByKeywordApi(searchParams);
      dispatch(action);
    }, 500);
  }, [searchParams.get("keyword")]);
  const handleChange = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const value = e.target.value;
      console.log(value);
      //Sort theo price tăng dần
      if (value === "ascending") {
        //ascending: tăng dần
        const arrNewProduct = _.sortBy(arrProduct, ["price"]);
        const action = setArrProductBySort(arrNewProduct);
        dispatch(action);
        //Đảo mảng tăng dần thành giảm dần
      } else if (value === "decrease") {
        const arrNewProduct = _.sortBy(arrProduct, ["price"]).reverse();
        const action = setArrProductBySort(arrNewProduct);
        dispatch(action);
      } else {
        setSearchParams({
          keyword: value,
        });
      }
    }, 500);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container search">
      <form className="search " onSubmit={handleSubmit}>
        <p>Search</p>
        <div className="form-group ">
          <input
            placeholder="Product name"
            name="search"
            id="search"
            className="form-control"
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary " >Search</button>
        </div>
      </form>
      <h2>Search Result</h2>
      <div className="form-group">
        <p>Price</p>
        <select className="form-control" id="sortByPrice" onChange={handleChange}>
          <option value="">Change Option</option>
          <option value="decrease">Cao đến Thấp</option>
          <option value="ascending">Thấp đến Cao</option>
        </select>
      </div>
      <div className="row">
        {arrProduct?.map((prod, index) => {
          return (
            <div className="col-sm-6 col-lg-4 mt-4" key={index}>
              <div className="card">
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <button className="btn ">
                    <NavLink to={`/detail/${prod.id}`}>Buy now</NavLink>
                    <span>${prod.price}$</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
