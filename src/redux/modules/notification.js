import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

import { history } from '../configureStore';
import { NotiApi } from '../../shared/api';

export const getNotiApi = createAsyncThunk('notification/getNotiApi', async () => {
    try {
        const response = await NotiApi.getNoti();
        return response.data;
    } catch (error) {
        console.log('getNotiApi: ', error);
        // alert('getNotiApi error');
    }
});

export const getBarterNotiApi = createAsyncThunk(
    'notification/getBarterNotiApi',
    async ({ notificationId, changeId }) => {
        try {
            const response = await NotiApi.getBarterNoti(changeId, notificationId);
            history.push(`/trproposal/${changeId}`);
            return response.data;
        } catch (error) {
            console.log('getBarterNotiApi: ', error);
            // alert('getBarterNotiApi error');
        }
    },
);

export const getChatNotiApi = createAsyncThunk(
    'notification/getChatNotiApi',
    async ({ notificationId, changeId }) => {
        try {
            await NotiApi.getChatNoti(changeId, notificationId);
            history.push(`/chat/${changeId}`);
        } catch (error) {
            console.log('getChatNotiApi: ', error);
            // alert('getChatNotiApi error');
        }
    },
);

export const getWelcomApi = createAsyncThunk(
    'notification/getWelcomApi',
    async (notificationId) => {
        try {
            await NotiApi.getWelcomNoti(notificationId);
        } catch (error) {
            console.log('getChatNotiApi: ', error);
            // alert('getChatNotiApi error');
        }
    },
);

export const getScoreNotiApi = createAsyncThunk('notification/getScoreNotiApi', async ({ notificationId, changeId }) => {
    try {
        const response = await NotiApi.getScoreNoti(changeId, notificationId);
        return response.data;
    } catch (error) {
        console.log('getScoreNotiApi: ', error);
        // alert('getScoreNotiApi error');
    }
});

const initialState = {
    noti_list: [],
    noti_barter: {
        userId: '',
        nickname: '',
        degree: '',
        title: '',
        contents: '',
        image: '',
        opponentNickname: '',
        barterItem: [],
    },
    score_info: {},
    unread_noti: 0,
};

export const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNoti: (state, action) => {
            state.noti_list = [action.payload, ...state.noti_list];
        },
        setUnreadNoti: (state, action) => {
            state.unread_noti = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getNotiApi.fulfilled, (state, action) => {
                state.noti_list = action.payload;
            })
            .addCase(getBarterNotiApi.fulfilled, (state, action) => {
                state.noti_barter = action.payload;
            })
            .addCase(getScoreNotiApi.fulfilled, (state, action) => {
                state.barter_info = action.payload;
            })
            .addCase(PURGE, () => initialState)
    },
});

export const api = {
    getNotiApi,
    getBarterNotiApi,
    getChatNotiApi,
    getWelcomApi,
};

export const { setNoti, setUnreadNoti } = notification.actions;

export default notification.reducer;
