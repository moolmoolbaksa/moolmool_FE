import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
    'user/signup',
    async (formRegister) => {
        try {
            const response = await axios.post('/user/signup', formRegister);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const logIn = createAsyncThunk(
    'user/login',
    async (formLogIn) => {
        try {
            const response = await axios.post('/user/login', formLogIn);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const initialState = {
    user_info: {
        nickname: "",
        profile: "",
    },
    is_login: false, 
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.nickname = action.payload.nickname;
            state.profile = action.payload.profile;
            state.is_login = true;
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.nickname = action.payload.nickname;
            state.profile = action.payload.profile;
            state.is_login = true;
        });
    }
});

// export const { authLogin } = user.actions;

export default user.reducer;