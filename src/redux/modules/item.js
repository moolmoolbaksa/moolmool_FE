import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStarItemAPi = createAsyncThunk(
    'item/getStarItemAPi',
    async (search,thunkAPI) => {
        console.log(search)
        try {
            const response = await axios.get(`http://13.124.0.71/api/items/star`,{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            return response.data;
        } catch (error) {
            console.log("getStarItemAPi: ", error);
            alert('getStarItemAPi error');
        };
    }
);

export const item = createSlice({
    name: 'item',
    initialState: {
        star_item_list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStarItemAPi.fulfilled, (state, action) => {
                state.star_item_list = action.payload;
            })
    }
});

// export const {} = item.actions;

export const api = {
    getStarItemAPi,
};

export default item.reducer;