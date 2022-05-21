import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { history } from '../configureStore';

export const getProductApi = createAsyncThunk('product/getProductApi', async (itemId, thunkAPI) => {
    try {
        let response;
        if (thunkAPI.getState().user.is_login) {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/items/${itemId}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
        } else {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/items/${itemId}`);
        }
        history.push(`/detail/${itemId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('getProductApi: ', error);
        // alert('getProductApi error');
        localStorage.removeItem('token');
        history.push('/login');
    }
});

export const deleteProductApi = createAsyncThunk('product/deleteProductApi', async itemId => {
    try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/items/${itemId}`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });
        history.push('/');
    } catch (error) {
        console.log('deleteProductApi: ', error);
        alert('deleteProductApi error');
    }
});

export const setProductScrabApi = createAsyncThunk('product/setProductScrabApi', async itemId => {
    try {
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/${itemId}/scrabs`,
            {},
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            },
        );
    } catch (error) {
        console.log('setProductScrabApi: ', error);
        alert('setProductScrabApi error');
    }
});

export const getMyScrabListApi = createAsyncThunk('product/getMyScrabListApi', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/scrab`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('getMyScrabListApi: ', error);
        alert('getMyScrabListApi error');
    }
});

export const getTradeProductApi = createAsyncThunk('product/setTradeProductApi', async ({ itemId, userId }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/trade?itemId=${itemId}&userId=${userId}`,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            },
        );
        history.push('/trade');
        return response.data;
    } catch (error) {
        console.log('setTradeProductApi: ', error);
        alert('setTradeProductApi error');
    }
});

export const setTradeApi = createAsyncThunk('propduct/setTradeApi', async (_, thunkAPI) => {
    const { userId, itemId } = thunkAPI.getState().product.product_info;
    const myItemIds = thunkAPI.getState().product.trade_item;
    console.log({ userId, itemId, myItemIds });
    try {
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/trade`,
            { userId, itemId, myItemIds },
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            },
        );
        history.replace(`/detail/${itemId}`);
    } catch (error) {
        console.log('setTradeApi: ', error);
        alert('setTradeApi error');
    }
});

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
            isScrab: false,
            scrabCnt: 0,
            status: '',
            title: '',
            userId: '',
            viewCnt: 0,
            itemId: '',
            type: '',
            favored: [],
        },
        barter_info: {},
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
                if (state.product_info.isScrab) {
                    state.product_info.scrabCnt -= 1;
                    state.product_info.isScrab = false;
                } else {
                    state.product_info.scrabCnt += 1;
                    state.product_info.isScrab = true;
                }
            })
            .addCase(getTradeProductApi.fulfilled, (state, action) => {
                state.barter_info = action.payload;
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
