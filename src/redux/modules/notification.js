import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

import { history } from '../configureStore';

export const getNotiApi = createAsyncThunk('notification/getNotiApi', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/notifications`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('getNotiApi: ', error);
        alert('getNotiApi error');
    }
});

export const getBarterNotiApi = createAsyncThunk(
    'notification/getBarterNotiApi',
    async ({ notificationId, changeId }) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/notification/${notificationId}/decision?baterId=${changeId}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                },
            );
            history.push(`/trproposal/${changeId}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('getBarterNotiApi: ', error);
            alert('getBarterNotiApi error');
        }
    },
);

export const getScoreNotiApi = createAsyncThunk('notification/getScoreNotiApi', async ({ notificationId, chageId }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/notification/${notificationId}/score?barterId=${chageId}`,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            },
        );
        // history.push('/')
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('getScoreNotiApi: ', error);
        alert('getScoreNotiApi error');
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
};

export const { setNoti, setUnreadNoti } = notification.actions;

export default notification.reducer;
