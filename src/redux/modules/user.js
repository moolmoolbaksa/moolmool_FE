import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";
import { response } from "../../shared/mock";

const loginCheckApi = createAsyncThunk(
    'user/loginCheckApi',
    async (thunkAPI) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get('http://13.124.0.71/user/check',{
                headers: {
                    Authorization: token,
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
                history.replace('/firstset');
            } else {
                history.replace('/');
            }
            console.log(response)
        } catch (error) {
            console.log("kakaologin error: ", error);
            alert('kakaologin error');
        }
    }
);

const setFirstUserInfoApi = createAsyncThunk(
    'user/setFristUserInfo',
    async (preview, introduce) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('profile', preview);
        formData.append('storeInfo', introduce);
        formData.append('address', '');
        try {
            const response = await axios.put(`http://13.124.0.71/user/info`,formData,{
                headers: {
                    Authorization: token,
                    // 'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response)
            // if(response.data.ok){
            //     history.replace('/');
            // }
        } catch (error) {
            console.log("setFirstUserInfo: ", error);
            alert('setFirstUserInfo error');
        }
    }
);

const getMyInfoApi = createAsyncThunk(
    'user/getMyInfo',
    async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get('http://13.124.0.71/api/mypage',{
                headers: {
                    Authorization: token,
                }
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("getMyInfo: ", error);
            alert('getMyInfo error');
        };
    }
);

const getCounterUserInfoApi = createAsyncThunk(
    'user/getCounterUserInfoApi',
    async (userId) => {
        try {
            // const response = await axios.get(`http://13.125.220.67:8080/${userId}/store`);
            // return response.data;
            history.push(`/mall/${userId}`);
            return response.couterUser;
        } catch (error) {
            console.log("getMyInfo: ", error);
            alert('getMyInfo error');
        };
    }
)

export const user = createSlice({
    name: 'user',
    initialState: {
        user_info: {
            nickname: "",
            profile: "",
            store_info: "",
            address: "",
            degree: "",
            grade: "",
        },
        other: {
            nickname: "",
            profile: "",
            store_info: "",
            address: "",
            degree: "",
            grade: "",
        },
        address: "",
        item_list: [],
        myScrabList: [],
        other_item_list: [],
        preview: "http://kaihuastudio.com/common/img/default_profile.png",
        is_login: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user.nickname = action.payload.nickname;
            state.user.profile = action.payload.profile;
            state.is_login = true;
        },
        setPreview: (state, action) => {
            state.preview = action.payload;
        },
        setIntroduce: (state, action) => {
            state.user.store_info = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.user_info.nickname = action.payload.nickname;
                state.user_info.profile = action.payload.profile;
                state.is_login = true;
            })
            .addCase(getMyInfoApi.fulfilled, (state, action) => {
                const {itemList, myScrabList, ...user_info} = action.payload;
                state.user_info = user_info;
                state.item_list = itemList;
                state.myScrabList = myScrabList;
            })
            .addCase(getCounterUserInfoApi.fulfilled, (state, action) => {
                const {itemList, ...other_info} = action.payload;
                state.other = other_info;
                state.other_item_list = itemList;
            })
    }
});

export const { 
    setPreview,
    setIntroduce,
    setAddress,
} = user.actions;

export const api = {
    loginCheckApi,
    kakaoLoginApi,
    setFirstUserInfoApi,
    getMyInfoApi,
    getCounterUserInfoApi,
};

export default user.reducer;