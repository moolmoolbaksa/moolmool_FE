import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";

const loginCheckApi = createAsyncThunk(
    'user/loginCheckApi',
    async (thunkAPI) => {
        try {
            const response = await axios.get(`http://13.124.0.71/user/check`,{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            return response.data
        } catch (error) {
            console.log("loginCheck error: ", error);
            alert('logincheck error');
        }
    }
);

const kakaoLoginApi = createAsyncThunk(
    'user/kakaoLogin',
    async (code, thunkAPI) => {
        try {
            const response = await axios.get(`http://13.124.0.71/user/kakao?code=${code}`);
   
            const token = response.headers.authorization;
            localStorage.setItem("token", token)
            
            thunkAPI.dispatch(loginCheckApi());
            
            if(response.data.isFirst){
                history.replace('/address');
            } else {
                history.replace('/');
            }
        } catch (error) {
            console.log("kakaologin error: ", error);
            alert('kakaologin error');
        }
    }
);

const setFirstUserInfoApi = createAsyncThunk(
    'user/setFirstUserInfoApi',
    async (address) => {
        try {
            await axios.put(`http://13.124.0.71/user/info`,{address},{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            return address;
        } catch (error) {
            console.log("setFirstUserInfoApi error: ", error);
            alert('setFirstUserInfoApi error');
        }
    }
);

const getMyInfoApi = createAsyncThunk(
    'user/getMyInfo',
    async () => {
        try {
            const response = await axios.get(`http://13.124.0.71/api/mypage`,{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            return response.data;
        } catch (error) {
            console.log("getMyInfo: ", error);
            alert('getMyInfo error');
        };
    }
);

const updateMyInfoApi = createAsyncThunk(
    'user/updateMyInfoApi',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(`http://13.124.0.71/api/mypage`,formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                    
                }
            });
            history.push('/mypage');
            return response.data.result;
        } catch (error) {
            console.log("updateMyInfoApi: ", error);
            alert('updateMyInfoApi error');
        };
    }
);

const getCounterUserInfoApi = createAsyncThunk(
    'user/getCounterUserInfoApi',
    async (userId) => {
        console.log(userId)
        try {
            const response = await axios.get(`http://13.124.0.71/api/store/${userId}`);
            history.push(`/mall/${userId}`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("getCounterUserInfoApi: ", error);
            alert('getCounterUserInfoApi error');
        };
    }
);

export const user = createSlice({
    name: 'user',
    initialState: {
        user_info: {
            nickname: "",
            userId: "",
            profile: "",
            storeInfo: "",
            address: "",
            degree: "",
            grade: "",
        },
        other: {
            nickname: "",
            profile: "",
            storeInfo: "",
            address: "",
            degree: "",
            grade: "",
            other_item_list: [],
        },
        address: "",
        item_list: [],
        myScrabList: [],
        preview: null,
        is_login: false,
        is_loading: true,
    },
    reducers: {
        setLoading: (state, action) => {
            state.is_loading = action.payload;
        },
        setPreview: (state, action) => {
            state.preview = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.user_info.nickname = action.payload.nickname;
                state.user_info.profile = action.payload.profile;
                state.user_info.userId = action.payload.userId;
                state.is_login = true;
            })
            .addCase(getMyInfoApi.fulfilled, (state, action) => {
                const {itemList, myScrabList, ...user_info} = action.payload;
                state.user_info = user_info;
                state.item_list = itemList;
                state.myScrabList = myScrabList;
            })
            .addCase(setFirstUserInfoApi.fulfilled, (state, action) => {
                state.user_info.address = action.payload;
            })
            .addCase(updateMyInfoApi.fulfilled, (state, action) => {
                const {profile, ...other} = action.payload;
                if(profile === 'empty'){
                    state.user_info = {
                        ...state.user_info,
                        ...other
                    };
                } else {
                    state.user_info = {
                        ...state.user_info,
                        ...other,
                        profile
                    };
                };
            })
            .addCase(getCounterUserInfoApi.fulfilled, (state, action) => {
                const {itemList, ...other_info} = action.payload;
                state.other = other_info;
                state.other.other_item_list = itemList;
            })
    }
});

export const { 
    setPreview,
    setAddress,
    setLoading,
} = user.actions;

export const api = {
    loginCheckApi,
    kakaoLoginApi,
    setFirstUserInfoApi,
    getMyInfoApi,
    updateMyInfoApi,
    getCounterUserInfoApi,
};

export default user.reducer;