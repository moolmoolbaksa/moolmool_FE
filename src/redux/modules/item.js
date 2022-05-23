import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { history } from '../configureStore';

export const getItemApi = createAsyncThunk('item/getItemApi', async ({category, page}) => {
    try {
        const is_token = localStorage.getItem('token');
        let response;
        if (is_token) {
            response = await axios.get(`https://langho968.shop/items/${page}?category=${category}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
        } else {
            response = await axios.get(`https://langho968.shop/items/${page}?category=${category}`);
        };

        let is_next;
        
        if(response.data.length < 10){
            is_next = false;
        } else {
            is_next = true;
        };
        
        const data = {
            list: response.data,
            paging: {
                page: page + 1,
                next: is_next,
                category: category,
            },
        };

        return data;
    } catch (error) {
        console.log('getItemApi: ', error);
        history.push('/login');
    }
})

export const getStarItemAPi = createAsyncThunk('item/getStarItemAPi', async (_, thunkAPI) => {
    try {
        const is_token = localStorage.getItem('token');
        let response;
        if (is_token) {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/items/star`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
        } else {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/items/star`);
        }
        return response.data;
    } catch (error) {
        console.log('getStarItemAPi: ', error);
        alert('getStarItemAPi error');
        history.push('/login');
    }
});

export const item = createSlice({
    name: 'item',
    initialState: {
        star_item_list: [],
        item_list: [],
        paging: {
            page: 0,
            next: false,
            category: null,
        },
        is_loading: false,
    },
    reducers: {
        clearList: (state, action) => {
            state.item_list = [];
            state.is_next = false;
            state.is_loading = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getItemApi.fulfilled, (state, action) => {
                const {list, paging} = action.payload;
                
                // 다른 페이지에서 메인에 도달 시 기존 리덕스 상태를 초기화하기 위함
                if(paging.page !== 1){
                    state.item_list = [...state.item_list, ...list];
                    state.paging = paging;
                    state.is_loading = false;
                } else {
                    state.item_list = list;
                    state.paging = paging;
                    state.is_loading = false;
                };
            })
            .addCase(getStarItemAPi.fulfilled, (state, action) => {
                state.star_item_list = action.payload;
            });
    },
});

export const {
    clearList,
} = item.actions;

export const api = {
    getItemApi,
    getStarItemAPi,
};

export default item.reducer;
