import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemAPI } from "../../shared/api";

export const getSearchApi = createAsyncThunk(
    'search/getSearchApi',
    async (search) => {
        try {
            const response = await ItemAPI.getSearchItem(search);
            return {response: response.data, search};
        } catch (error) {
            console.log("getSearchApi: ", error);
            alert('getSearchApi error');
        }
    }
);

export const search = createSlice({
    name: 'search',
    initialState: {
        search_list: [],
        search_history: [],
        search_word: '',
    },
    reducers: {
        deleteSearchHistory: (state, action) => {
            state.search_history = state.search_history.filter(v => v !== action.payload);
        },
        resetSearchHistory: (state, action) => {
            state.search_history = [];
        },
        resetSearchList: (state, action) => {
            state.search_list = [];
            state.search_word = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchApi.fulfilled, (state, action) => {
                state.search_list = action.payload.response;
                state.search_word = action.payload.search;
                const dupArr = [action.payload.search, ...state.search_history];
                const set = new Set(dupArr);
                state.search_history = [...set];
            })
    }
});

export const {
    deleteSearchHistory,
    resetSearchHistory,
    resetSearchList,
} = search.actions;

export const api = {
    getSearchApi,
};

export default search.reducer;