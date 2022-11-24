import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";

const initialState = {
    cart:[],
    order: {
        orderDetail: [
          {
            productId: "",
            quantity: "",
          },
        ],
        email: "",
      },
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers:{
        addToCartAction: (state, action) => {
            let newProduct = action.payload;
            let prodCart = {
              productId: newProduct.id,
              name: newProduct.name,
              price: newProduct.price,
              image: newProduct.image,
              quantity: 1,
            };
            let index = state.cart.findIndex(
              (prod) => prod.productId === prodCart.productId
            );
            if (index !== -1) {
              state.cart[index].quantity += 1;
            } else {
              state.cart.push(prodCart);
            }
          },
          totalCartAction: (state,action) => {
            console.log({action});
            state.cart = action.payload;
          },
          tangGiamSL: (state, action) => {
            let { id, bool } = action.payload;
            let index = state.cart.findIndex((prod) => prod.productId === id);
            if (bool) {
              state.cart[index].quantity += 1;
            } else if (state.cart[index].quantity > 1) {
              state.cart[index].quantity -= 1;
            }
          },
          deleteCartAction:(state,action) =>{
            let id = action.payload;
            let index = state.cart.findIndex((prod) => prod.productId === id);
            console.log({ index });
            if (index !== -1) {
              state.cart.splice(index, 1);
            }
            console.log(state.cart);
          },
          postOrderAction: (state, action) => {
            state.cart = [];
          },
    }
})


export const {addToCartAction,totalCartAction,tangGiamSL,deleteCartAction,postOrderAction} = cartReducer.actions;
export default cartReducer.reducer;

export const postOrder = (value) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/order",
        method: "POST",
        data: value,
      });
      console.log(result.data.content);
      alert(result.data.content);
      const action = postOrderAction(value);
      dispatch(action);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};