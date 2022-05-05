import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";

export const getProductApi = createAsyncThunk(
    'product/getProductApi',
    async (itemId) => {
        const token = localStorage.getItem("token");
        console.log(itemId)
        try {
            const response = await axios.get(`http://54.146.243.198/api/items/${itemId}`,{
                headers: {
                    Authorization: token,
                }
            });
            console.log(response)
            history.push(`/detail/${itemId}`);
            return response.data;
            // return response.product;
        } catch (error) {
            console.log("getProductApi: ", error);
            alert('getProductApi error');
        }
    }
);

export const setProductScrabApi = createAsyncThunk(
    'product/setProductScrabApi',
    async (itemId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.post(`http://54.146.243.198/api/${itemId}/scrabs`,{},{
                headers: {
                    Authorization: token,
                }
            });
            // reducer의 product_info 최신화할지는 고민해보기!
        } catch (error) {
            console.log("setProductScrabApi: ", error);
            alert('setProductScrabApi error');
        }
    }
);

export const product = createSlice({
    name: 'product',
    initialState: {
        product_info: {
            bagImages: [],
            contents: '',
            date: '',
            images: [],
            degree: '',
            grade: '',
            nickname:'',
            profile: '',
            isScrab: false,
            scrabCnt: 0,
            status: '',
            title: '',
            userId: '',
            viewCnt: 0,
        },
        is_loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductApi.fulfilled, (state, action) => {
                state.product_info = action.payload;
            })
            .addCase(setProductScrabApi.fulfilled, (state, action) => {
                if(state.product_info.isScrab){
                    state.product_info.scrabCnt -= 1;
                    state.product_info.isScrab = false;
                } else {
                    state.product_info.scrabCnt += 1;
                    state.product_info.isScrab = true;
                };
            })
    }
});

export const api = {
    getProductApi,
    setProductScrabApi,
};

export default product.reducer;
