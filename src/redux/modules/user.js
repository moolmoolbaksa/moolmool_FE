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
            
            const token = response.headers.authorization;
            localStorage.setItem("token", token)

            thunkAPI.dispatch(loginCheckApi());
        } catch (error) {
            console.log(error);
        }    
    }
);

const loginCheckApi = createAsyncThunk(
    'user/loginCheckApi',
    async () => {
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

export const user = createSlice({
    name: 'user',
    initialState: {
        nickname: "",
        profile: "",
        is_login: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.nickname = action.payload.nickname;
                state.profile = action.payload.profile;
                state.is_login = true;
            });
    }
});

// export const { authLogin } = user.actions;

export const api = {
    signupApi,
    loginApi,
    loginCheckApi,
};

export default user.reducer;