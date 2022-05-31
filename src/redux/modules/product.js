import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ItemAPI } from '../../shared/api';
import { TradeAPI } from '../../shared/api';

import { history } from '../configureStore';

export const getProductApi = createAsyncThunk(
    'product/getProductApi', 
    async (itemId) => {
        try {
            const response = await ItemAPI.getDetail(itemId);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log('getProductApi: ', error);
            // alert('getProductApi error');
        }
    }  
);

export const deleteProductApi = createAsyncThunk(
    'product/deleteProductApi', 
    async itemId => {
        try {
            await ItemAPI.deleteItem(itemId);
            history.push('/');
        } catch (error) {
            console.log('deleteProductApi: ', error);
            // alert('deleteProductApi error');
        }
    }   
);

export const setProductScrabApi = createAsyncThunk(
    'product/setProductScrabApi', 
    async itemId => {
        try {
            await ItemAPI.setScrabItem(itemId);
        } catch (error) {
            console.log('setProductScrabApi: ', error);
            // alert('setProductScrabApi error');
        }
    }
);

export const getMyScrabListApi = createAsyncThunk(
    'product/getMyScrabListApi', 
    async () => {
        try {
            const response = await ItemAPI.getScrabList();
            console.log(response)
            return response.data;
        } catch (error) {
            console.log('getMyScrabListApi: ', error);
            // alert('getMyScrabListApi error');
        }
    }
);

export const getTradeProductApi = createAsyncThunk(
    'product/getTradeProductApi', 
    async ({ itemId, userId }) => {
        try {
            const response = await TradeAPI.getTradeItem(itemId, userId);
            history.push('/trade');
            return response.data;
        } catch (error) {
            console.log('getTradeProductApi: ', error);
            // alert('setTradeProductApi error');
        }
    }
);

export const setTradeApi = createAsyncThunk(
    'propduct/setTradeApi', 
    async (_, thunkAPI) => {
        const { userId, itemId } = thunkAPI.getState().product.product_info;
        const myItemIds = thunkAPI.getState().product.trade_item;
        try {
            await TradeAPI.setTrade(userId, itemId, myItemIds);
            history.replace(`/`);
        } catch (error) {
            console.log('setTradeApi: ', error);
            // alert('setTradeApi error');
        }
    }
);

export const product = createSlice({
    name: 'product',
    initialState: {
        product_info: {
            contents: '',
            date: '',
            images: [],
            degree: '',
            grade: '',
            nickname: '',
            profile: '',
            scrab: false,
            scrabCnt: 0,
            status: '',
            title: '',
            userId: '',
            viewCnt: 0,
            itemId: '',
            type: '',
            favored: [],
        },
        barter_info: {
            myImages: [],
            sellerImages: '',
            sellerNickName: '',
        },
        scrab_list: [],
        trade_item: [],
        is_loading: false,
    },
    reducers: {
        setTrade: (state, action) => {
            if (state.trade_item.includes(action.payload)) {
                state.trade_item = state.trade_item.filter(val => val !== action.payload);
            } else {
                state.trade_item.push(action.payload);
            }
        },
        resetTrade: (state, action) => {
            state.trade_item = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProductApi.fulfilled, (state, action) => {
                state.product_info = action.payload;
            })
            .addCase(setProductScrabApi.fulfilled, (state, action) => {
                if (state.product_info.scrab) {
                    state.product_info.scrabCnt -= 1;
                    state.product_info.scrab = false;
                } else {
                    state.product_info.scrabCnt += 1;
                    state.product_info.scrab = true;
                }
            })
            .addCase(getTradeProductApi.fulfilled, (state, action) => {
                state.barter_info = action.payload;
                console.log(action.payload.itemId);
            })
            .addCase(setTradeApi.fulfilled, (state, action) => {
                state.trade_item = [];
            })
            .addCase(getMyScrabListApi.fulfilled, (state, action) => {
                state.scrab_list = action.payload;
            });
    },
});

export const api = {
    getProductApi,
    deleteProductApi,
    setProductScrabApi,
    getTradeProductApi,
    getMyScrabListApi,
    setTradeApi,
};

export const { setTrade, resetTrade } = product.actions;

export default product.reducer;
