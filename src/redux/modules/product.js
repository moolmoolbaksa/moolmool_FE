import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";

export const getProductApi = createAsyncThunk(
    'product/getProductApi',
    async (itemId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://13.124.0.71/api/items/${itemId}`,{
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
            await axios.post(`http://13.124.0.71/api/${itemId}/scrabs`,{},{
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

export const getMyScrabListApi = createAsyncThunk(
    'product/getMyScrabListApi',
    async () => {
        try {
            const response = await axios.get('http://13.124.0.71/api/mypage/scrab',{
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log("getMyScrabListApi: ", error);
            alert('getMyScrabListApi error');
        }
    }
);

export const setTradeProductApi = createAsyncThunk(
    'product/setTradeProductApi',
    async ({itemId, userId}) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://13.124.0.71/api/trade?itemId=${itemId}&userId=${userId}`,{
                headers: {
                    Authorization: token,
                } 
            });
            console.log(response)
            history.push('/trade');
            return response.data;
        } catch (error) {
            console.log("setTradeProductApi: ", error);
            alert('setTradeProductApi error');
        }
    }
);

export const product = createSlice({
    name: 'product',
    initialState: {
        product_info: {
            bagInfos: [],
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
        scrab_list: [],
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
            .addCase(getMyScrabListApi.fulfilled, (state, action) => {
                state.scrab_list = action.payload;
            })
    }
});

export const api = {
    getProductApi,
    setProductScrabApi,
    setTradeProductApi,
    getMyScrabListApi,
};

export default product.reducer;
