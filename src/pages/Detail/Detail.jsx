import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetailApi } from "../../redux/Reducer/productReducer";
import { useParams, NavLink } from "react-router-dom";
import {addToCartAction} from "../../redux/Reducer/cartReducer"




export default function Detail() {
  const { productDetail } = useSelector((state) => state.productReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  

  useEffect(() => {
    const action = getProductDetailApi(id);
    dispatch(action);
  }, [id]);

  const addNewProd = (productDetail) => {
    // dispatch lên redux 1 productDetail
      const action = addToCartAction(productDetail);
      dispatch(action);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-2">
          <img src={productDetail.image} alt="..." />
        </div>
        <div className="col-8 mt-2">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
          <h4>Avaliable size</h4>
          <div>
            {productDetail?.size?.map((size, index) => {
              return <button className="btn-size" key={index}>{size}</button>;
            })}
          </div>
          <div class="pro-quality">
            <button class="btn-quality">
              <i class="fa-solid fa-plus"></i>
            </button>
            <span>1</span>
            <button class="btn-quality">
              <i class="fa-solid fa-minus"></i>
            </button>
          </div>
          <div class="add-to-card">
          <button
              className="btn-add" onClick={()=>{addNewProd(productDetail);}}
            >
              Add to cart <i className="fa fa-cart-plus mx-2"></i>
            </button>
          </div>
        </div>
      </div>
      <h3 className="mt-2">Related Products</h3>
      <div className="row mt-2">
        {productDetail.relatedProducts?.map((pro, index) => {
          return (
            <div className="col-4" key={index}>
              <div className="card">
                <img src={pro.image} alt="..." />
                <div className="card-body">
                  <p>{pro.name}</p>
                  <p>{pro.description}</p>
                  <button className="btn">
                    <NavLink to={`/detail/${pro.id}`}>Buy now</NavLink>
                    <span>${pro.price}$</span>
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
