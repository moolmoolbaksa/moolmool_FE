import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    Roomlist: [],
    Opponent:{
        userId:"",
        profile:"",
        nickname:"",
        isBanned:false,
    },
    Currentroom:{
        roomId:"",
        userId:"",
        type:"NORMAL",
        readCnt:0,
        date:"",
    },
    messages:[],
    moveScroll:1,
    BanList:[],
    connected:false,
};


export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRoomlist: (state,action)=>{
            state.Roomlist=action.payload;
        },
        enterRoom:(state,action)=>{
            // console.log(action.payload);
            //현재방정보 입력
            state.Currentroom.roomId=action.payload.roomId;
            state.Currentroom.userId=action.payload.userId;
            state.Currentroom.isBanned=action.payload.isBanned;
            //현재방의 상대방 정보
            state.Opponent.userId=action.payload.userId;
            state.Opponent.profile=action.payload.profile;
            state.Opponent.nickname=action.payload.nickname;
            state.Opponent.isBanned=action.payload.isBanned;
            // console.log(action.payload);

        },
        getPreviousMessages:(state,action)=>{
            state.messages=action.payload;
            // console.log(state.messages);
        },
        addMessage:(state,action)=>{
            state.messages.unshift(action.payload);
        },
        changeRoomtype: (state,action)=>{
            state.Currentroom.type=action.payload
        },
        moveScroll: (state,action)=>{
          state.moveScroll+=1;
        },
        setBanList: (state,action)=>{
          state.BanList=action.payload;
        },
        releaseUser: (state,action)=>{
          state.BanList=state.BanList.filter((p,idx)=>p.userId!==action.payload);
        },
        setConnect: (state,action)=>{
          state.connected=action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(PURGE, () => initialState)
    }
});

export const {
    setRoomlist,
    enterRoom,
    setOpponent,
    getPreviousMessages,
    addMessage,
    changeRoomtype,
    moveScroll,
    setBanList,
    releaseUser,
    setConnect,
} = chat.actions;

export const api = {
    
};

export default chat.reducer;