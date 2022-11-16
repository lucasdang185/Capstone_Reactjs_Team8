import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrProduct: [],
};

const searchProductReducer = createSlice({
  name: 'searchProductReducer',
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setArrProductBySort: (state, action) => {
      state.arrProduct = action.payload;
    },
  },
});

export const { setArrProductAction, setArrProductBySort } =
  searchProductReducer.actions;

export default searchProductReducer.reducer;

// ---- getProductByKeywordApi---
export const getProductByKeywordApi = (searchParams) => {
  return async (dispatch) => {
    try {
      //Call api
      const result = await http.get(
        `/api/Product?keyword=${searchParams.get("keyword")}`
      );
      // Lấy dữ liệu về đưa lên redux
      const action = setArrProductAction(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

