import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";

export const getProductApi = createAsyncThunk(
    'product/getProductApi',
    async (itemId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://13.125.220.67:8080/api/items/${itemId}`,{
                headers: {
                    Authorization: token,
                }
            });
            console.log(response)
            history.push(`/detail/${itemId}`);
            return response.data;
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
            await axios.post(`http://13.125.220.67:8080/api/${itemId}/scrabs`,{},{
                headers: {
                    Authorization: token,
                }
            });
        } catch (error) {
            console.log("setProductScrabApi: ", error);
            alert('setProductScrabApi error');
        }
    }
);

export const setTradeProductApi = createAsyncThunk(
    'product/setTradeProductApi',
    async (itemId, userId) => {
        console.log(itemId, userId, '??')
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://13.125.220.67:8080/api/trade?itemId=${itemId}&userId=${userId}`,{
                headers: {
                    Authorization: token,
                } 
            });
            history.push('/change');
            return response.data;
        } catch (error) {
            console.log("setTradeProductApi: ", error);
            alert('setTradeProductApi error');
        }
    }
)

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
            itemId: '',
        },
        barter_info: {},
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
            .addCase(setTradeProductApi.fulfilled, (state, action) => {
                state.barter_info = action.payload;
            })
    }
});

export const api = {
    getProductApi,
    setProductScrabApi,
    setTradeProductApi,
};

export default product.reducer;
