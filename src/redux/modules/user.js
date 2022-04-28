import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../configureStore";

export const signUp = (formRegister) => {
    return async function (dispatch, getState){
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
}
    
export const logIn = (formLogin) => {
    return async function (dispatch, getState) {
        try {
            const response = await axios.post('http://13.124.0.71/user/login', formLogin);
            console.log(response);
            if(!response.data.ok){
                window.alert("기입된 정보를 다시 확인해주세요.")
            }
        } catch (error) {
            console.log(error);
        }
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