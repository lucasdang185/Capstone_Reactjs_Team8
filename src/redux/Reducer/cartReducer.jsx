import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    cart:[],
    order: {
        orderDetail: [
          {
            productId: "",
            quantity: "",
          },
        ],
      },
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers:{
        addToCartAction: (state, actions) => {
            let newProduct = actions.payload;
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
          totalCartAction: (state,actions) => {
            console.log({actions});
            state.cart = actions.payload;
          },
          tangGiamSL: (state, actions) => {
            let { id, bool } = actions.payload;
            let index = state.cart.findIndex((prod) => prod.productId === id);
            if (bool) {
              state.cart[index].quantity += 1;
            } else if (state.cart[index].quantity > 1) {
              state.cart[index].quantity -= 1;
            }
          },
          deleteCartAction:(state,actions) =>{
            let id = actions.payload;
            let index = state.cart.findIndex((prod) => prod.productId === id);
            console.log({ index });
            if (index !== -1) {
              state.cart.splice(index, 1);
            }
            console.log(state.cart);
          },
          postOrderAction: (state, actions) => {
            state.cart = [];
          },
    }
})


export const {addToCartAction,totalCartAction,tangGiamSL,deleteCartAction,postOrderAction} = cartReducer.actions;
export default cartReducer.reducer;

