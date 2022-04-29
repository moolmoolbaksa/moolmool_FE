import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";

export const signupApi = createAsyncThunk(
    'user/signupApi',
    async (formRegister, thunkAPI) => {
        try {
            const response = await axios.post('http://13.124.0.71/user/signup', formRegister);
            if(response.data.ok){
                window.alert("안녕")
                history.push('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginApi = createAsyncThunk(
    'user/loginApi',
    async (formLogin, thunkAPI) => {
        try {
            const response = await axios.post('http://13.124.0.71/user/login', formLogin);
            
            if(!response.data.ok){
                window.alert("기입된 정보를 다시 확인해주세요.");
                return;
            }
            console.log(response)
            const token = response.headers.authorization;
            localStorage.setItem("token", token)

            thunkAPI.dispatch(loginCheckApi());

            if(response.data.isFirst){
                history.replace('/firstset');
            } else {
                history.replace('/');
            }
        } catch (error) {
            console.log(error);
        }    
    }
);

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

const kakaoLogin = createAsyncThunk(
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
        } catch (error) {
            console.log("kakaologin error: ", error);
            alert('kakaologin error');
        }
    }
);

const setFirstUserInfo = createAsyncThunk(
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

export const user = createSlice({
    name: 'user',
    initialState: {
        user: {
            nickname: "",
            profile: "",
            introduce: "",
            address: "",
        },
        preview: "http://kaihuastudio.com/common/img/default_profile.png",
        is_login: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.nickname = action.payload.nickname;
            state.profile = action.payload.profile;
            state.is_login = true;
        },
        setPreview: (state, action) => {
            state.preview = action.payload;
        },
        introduce: (state, action) => {
            state.introduce = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.nickname = action.payload.nickname;
                state.profile = action.payload.profile;
                state.is_login = true;
            });
    }
});

export const { 
    setPreview,
    introduce,
    setAddress,
} = user.actions;

export const api = {
    signupApi,
    loginApi,
    loginCheckApi,
    kakaoLogin,
    setFirstUserInfo,
};

export default user.reducer;