import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {tangGiamSL,deleteCartAction,postOrderAction, postOrder} from "../../redux/Reducer/cartReducer"

import {
  settings,
  USER_LOGIN,
} from "../../util/config";

export default function Cart() {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const tangGiam = (id, bool) => {
    let value = {
      id,
      bool,
    };
    const action = tangGiamSL(value);
    dispatch(action);
  };
  const deleteCart= (id) => {
    console.log({ id });
    const action = deleteCartAction(id);
    dispatch(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email } = settings.getStorageJson(USER_LOGIN);
    let order = {
      email: email,
      orderDetail: cart,
    };
    const action = postOrder(order); // truyển data order
    dispatch(action);
  };
  return (
    <div className="cart container">
      <h1>Cart</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="check" id="check" />
            </th>
            <th>id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((prod, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    name="checkbox"
                    value={true}
                    id="checkbox"
                    onClick={() => {}}
                  />
                </td>
                <td>{prod.productId}</td>
                <td>
                  <img src={prod.image} alt="..." />
                </td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td className="quantity">
                  <button className="btn-quantity" onClick={()=>{tangGiam(prod.productId,false);}}>-</button>
                  <span>{prod.quantity}</span>
                  <button className="btn-quantity" onClick={()=>{tangGiam(prod.productId,true);}}>+</button>
                </td>
                <td>{prod.price * prod.quantity}</td>
                <td >
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => {
                      deleteCart(prod.productId);
                    }}
                  >
                    Delete
                  </button>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button className="btn-submit" type="submit" onClick={handleSubmit}>
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}
