import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { history } from "../configureStore";
import { response } from "../../shared/mock";

const loginCheckApi = createAsyncThunk(
    'user/loginCheckApi',
    async (thunkAPI) => {
        try {
            const response = await axios.get('http://13.124.0.71/user/check',{
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
// const rommlist={date: "2022-05-10T19:13:00.766",
// isRead: true,
// message: "ㅏ",
// nickname: "김진현",
// profile: "http://k.kakaocdn.net/dn/Evbux/btrc1u2Rj9J/6Uy9FHQPHTlKKoMFBidbGK/img_640x640.jpg",
// readCnt: 3,
// roomId: 1,
// userId: 2}

const initialState={

    Roomlist: [],
    Opponent:{
        userId:"",
        profile:"",
        nickname:"",
    },
    Currentroom:{
        roomId:"",
        userId:"",
        type:"NORMAL",
        readCnt:0,
        date:"",
    },
    messages:[],
}


export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRoomlist: (state,action)=>{
            state.Roomlist=action.payload;
        },
        enterRoom:(state,action)=>{
            console.log(action.payload);
            //현재방정보 입력
            state.Currentroom.roomId=action.payload.roomId;
            state.Currentroom.userId=action.payload.userId;
            //현재방의 상대방 정보
            state.Opponent.userId=action.payload.userId;
            state.Opponent.profile=action.payload.profile;
            state.Opponent.nickname=action.payload.nickname;
            console.log(action.payload);

        },
        getPreviousMessages:(state,action)=>{
            state.messages=action.payload;
            console.log(state.messages);
        },
        addMessage:(state,action)=>{
            state.messages.unshift(action.payload);
        },
        changeRoomtype: (state,action)=>{
            state.Currentroom.type=action.payload
        },

    },

    extraReducers: (builder) => {
        // builder
        //     .addCase(loginCheckApi.fulfilled, (state, action) => {
        //         state.user_info.nickname = action.payload.nickname;
        //         state.user_info.profile = action.payload.profile;
        //         state.is_login = true;
        //     })
    }
});

export const {
    setRoomlist,
    enterRoom,
    setOpponent,
    getPreviousMessages,
    addMessage,
    changeRoomtype,
} = chat.actions;

export const api = {
    
};

export default chat.reducer;