import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { history } from '../configureStore';

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
        // alert('getStarItemAPi error');
        // localStorage.removeItem('token');
        history.push('/login');
    }
});

export const item = createSlice({
    name: 'item',
    initialState: {
        star_item_list: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStarItemAPi.fulfilled, (state, action) => {
            state.star_item_list = action.payload;
        });
    },
});

// export const {} = item.actions;

export const api = {
    getStarItemAPi,
};

export default item.reducer;
