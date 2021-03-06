import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import { instance } from '../../shared/api';

import { history } from '../configureStore';
import { userAPI } from '../../shared/api';
import { setCookie } from '../../shared/cookie';

const loginCheckApi = createAsyncThunk(
    'user/loginCheckApi', 
    async () => {
        try {
            const response = await userAPI.loginCheck();
            return response.data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error)
            }
        }
    }
);

const kakaoLoginApi = createAsyncThunk(
    'user/kakaoLogin', 
    async (code, thunkAPI) => {
        try {
            const response = await userAPI.kakaoLogin(code);
            localStorage.setItem('accessToken', response.headers.authorization);
            localStorage.setItem('refreshToken', response.headers.refresh);
            instance.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken');
            
            // setCookie('refreshToken', response.headers.refresh);

            if (!response.data.isFirst) {
                history.replace('/');
            } else {
                thunkAPI.dispatch(loginCheckApi());
                history.replace('/address');
            }
        } catch (error) {
            console.log('kakaologin error: ', error);
            alert('kakaologin error');
        }
    }
);

const googleLoginApi = createAsyncThunk(
    'user/googleLoginApi', 
    async (code, thunkAPI) => {
        try {
            const response = await userAPI.googleLogin(code);
            localStorage.setItem('accessToken', response.headers.authorization);
            localStorage.setItem('refreshToken', response.headers.refresh);
            instance.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken');

            if (!response.data.isFirst) {
                history.replace('/');
            } else {
                thunkAPI.dispatch(loginCheckApi());
                history.replace('/address');
            }
        } catch (error) {
            console.log('googleLoginApi error: ', error);
            alert('googleLoginApi error');
        }
    }
);
   
const setFirstUserInfoApi = createAsyncThunk(
    'user/setFirstUserInfoApi',
    async (address) => {
        try {
            await userAPI.firstUser(address);
            return address;
        } catch (error) {
            console.log('setFirstUserInfoApi error: ', error);
        }   
    }
);

const getMyInfoApi = createAsyncThunk(
    'user/getMyInfo', 
    async () => {
        try {
            const response = await userAPI.getMyInfo();
            console.log(response)
            return response.data;
        } catch (error) {
            console.log('getMyInfo: ', error);
        }
    }
);

const updateMyInfoApi = createAsyncThunk(
    'user/updateMyInfoApi', 
    async (formData, thunkAPI) => {
        try {
            const response = await userAPI.updateMyInfo(formData);
            history.push('/mypage');
            return response.data.result;
        } catch (error) {
            console.log('updateMyInfoApi: ', error);
        }
    }
);

const getCounterUserInfoApi = createAsyncThunk(
    'user/getCounterUserInfoApi', 
    async (userId) => {
        try {
            const response = await userAPI.getOtherUserInfo(userId);
            history.push(`/mall/${userId}`);
            return response.data;
        } catch (error) {
            console.log('getCounterUserInfoApi: ', error);
        }
    }
);

const initialState = {
    user_info: {
        nickname: '',
        userId: '',
        profile: '',
        storeInfo: '',
        address: '',
        degree: '',
        degreePoint: '',
        totalPoint: '',
        requesterCnt: '',
        acceptorCnt: '',
        scoreCnt: '',
    },
    other: {
        nickname: '',
        profile: '',
        storeInfo: '',
        address: '',
        degree: '',
        grade: '',
        other_item_list: [],
    },
    address: '',
    item_list: [],
    myScrabList: [],
    preview: null,
    is_login: false,
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPreview: (state, action) => {
            state.preview = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.user_info.nickname = action.payload.nickname;
                state.user_info.profile = action.payload.profile;
                state.user_info.userId = action.payload.userId;
                state.is_login = true;
            })
            .addCase(getMyInfoApi.fulfilled, (state, action) => {
                const { itemList, myScrabList, ...user_info } = action.payload;
                state.user_info = { ...state.user_info, ...user_info };
                state.item_list = itemList;
                state.myScrabList = myScrabList;
            })
            .addCase(setFirstUserInfoApi.fulfilled, (state, action) => {
                state.user_info.address = action.payload;
            })
            .addCase(updateMyInfoApi.fulfilled, (state, action) => {
                const { profile, ...other } = action.payload;
                if (profile === 'empty') {
                    state.user_info = {
                        ...state.user_info,
                        ...other,
                    };
                } else {
                    state.user_info = {
                        ...state.user_info,
                        ...other,
                        profile,
                    };
                }
            })
            .addCase(getCounterUserInfoApi.fulfilled, (state, action) => {
                const { itemList, ...other_info } = action.payload;
                state.other = other_info;
                state.other.other_item_list = itemList;
            })
            .addCase(PURGE, () => initialState);
    },
});

export const { setPreview, setAddress, setLoading } = user.actions;

export const api = {
    loginCheckApi,
    kakaoLoginApi,
    googleLoginApi,
    setFirstUserInfoApi,
    getMyInfoApi,
    updateMyInfoApi,
    getCounterUserInfoApi,
};

export default user.reducer;
