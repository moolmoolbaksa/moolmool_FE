import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../configureStore";
import { apis } from "../../shared/api";
export const signUp = (formRegister) => {
    return async function (dispatch, getState){
    
    }
}
    
export const logIn = (formLogin) => {
    return async function (dispatch, getState) {

    }
};

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
    reducers: {},
    // extraReducers: (builder) => {
    //     builder.addCase(signUp.fulfilled, (state, action) => {
    //         state.nickname = action.payload.nickname;
    //         state.profile = action.payload.profile;
    //         state.is_login = true;
    //     });
        // builder.addCase(logIn.fulfilled, (state, action) => {
        //     state.nickname = action.payload.nickname;
        //     state.profile = action.payload.profile;
        //     state.is_login = true;
        // });
    // }
});

// export const { authLogin } = user.actions;

export default user.reducer;