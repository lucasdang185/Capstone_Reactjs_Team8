import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../util/config';

const initialState = {
    ProductData: [
        {
            "id": 1,
            "name": "Adidas Prophere",
            "alias": "adidas-prophere",
            "price": 350,
            "description": "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
            "size": "[36,37,38,39,40,41,42]",
            "shortDescription": "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
            "quantity": 995,
            "deleted": false,
            "categories": "[{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"MEN\",\"category\":\"MEN\"},{\"id\":\"WOMEN\",\"category\":\"WOMEN\"}]",
            "relatedProducts": "[2,3,5]",
            "feature": true,
            "image": "https://shop.cyberlearn.vn/images/adidas-prophere.png"
        }
    ]
}

const HomeReducer = createSlice({
    name: 'HomeReducer',
    initialState,
    reducers: {
        getData: (state, { type, payload }) => {
            // state.ProductData=[...state.ProductData,payload]
            // console.log(state.ProductData)
            let ProductData = payload;
            state.ProductData = ProductData;
            console.log(state.ProductData)
        }
    }
});

export const { getData } = HomeReducer.actions

export default HomeReducer.reducer


export const getApi = () => {

    return async dispatch => {
        const result=await http.get('api/Product');
        //Sau khi lấy dữ liệu từ api về => dispatch lên reducer
        //Tạo ra action creator đưa dữ liệu lên reducer
        const action = getData(result.data.content);
        dispatch(action);
    }
}
