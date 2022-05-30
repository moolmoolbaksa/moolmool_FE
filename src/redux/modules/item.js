import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ItemAPI } from '../../shared/api';

export const getItemApi = createAsyncThunk(
    'item/getItemApi', 
    async ({category, page}) => {
        try {
            const response = await ItemAPI.getItems(category, page);
            
            let is_next;
            
            if(response.data.items.length < 10){
                is_next = false;
            } else {
                is_next = true;
            };
            
            const data = {
                list: response.data.items,
                paging: {
                    total: response.data.totalCnt,
                    page: page + 1,
                    next: is_next,
                    category: category,
                    is_first: false,
                },
            };
            return data;
        } catch (error) {
            console.log('getItemApi: ', error);
        }
    }
);

export const getStarItemAPi = createAsyncThunk(
    'item/getStarItemAPi', 
    async () => {
        try {
            const response = await ItemAPI.getHotDeal();
            return response.data;
        } catch (error) {
            console.log('getStarItemAPi: ', error);
            // alert('getStarItemAPi error');
            // history.push('/login');
        }
    }
);

export const setReportItemApi = createAsyncThunk(
    'item/setReportItemApi', 
    async (itemId) => {
        try {
            await ItemAPI.setReportItem(itemId);
        } catch (error) {
            console.log('setReportItemApi: ', error);
            // alert('setReportItemApi error');
        }
    }
);

export const item = createSlice({
    name: 'item',
    initialState: {
        star_item_list: '',
        item_list: '',
        paging: {
            total: 0,
            page: 0,
            next: false,
            category: null,
            is_first: true,
        },
        is_loading: false,
    },
    reducers: {
        clearList: (state) => {
            state.item_list = [];
            state.is_next = false;
            state.is_loading = true;
        },
        setReload: (state) => {
            state.paging.is_first = true;
        },
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
    setReload,
} = item.actions;

export const api = {
    getItemApi,
    getStarItemAPi,
    setReportItemApi,
};

export default item.reducer;
