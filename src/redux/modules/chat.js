import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import _ from 'lodash';
import { act } from "react-dom/test-utils";
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
    client:"",
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
            
            // date: "2022-05-25T23:06:39.286" isRead: true message: "토너가왜요 ㅡㅡ" messageId: 102 senderId: 6 type: "TALK"
            // const date1=date.split('T')[1].slice(0,5);
            
            const temp_message=_.cloneDeep(action.payload);
            for (let i=temp_message.length-1; i>0; i--)
            {
              console.log(action.payload[i]);
              // console.log(i);
              let preMessageId=action.payload[i].messageId;
              let nextMessageId=action.payload[i-1].messageId;
              let newMessageId=preMessageId-0.1;

              if (i===temp_message.length-1)
              {
                action.payload.splice(i+1,0,{messageId:newMessageId,date:temp_message[i].date, message:"", type:"DEVIDE"});
              }
              else{
                
                let preDate=new Date(temp_message[i].date.split('T')[0].slice(0,10));
                let nextDate=new Date(temp_message[i-1].date.split('T')[0].slice(0,10));
            
                let dategap=preDate-nextDate;
                if (dategap<0){
                  action.payload.splice(i,0,{messageId:nextMessageId-0.1,date:temp_message[i-1].date, message:"", type:"DEVIDE"});
                }
                console.log(dategap);
                } 
            }
            state.messages=action.payload;
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
          // state.connected=action.payload;
          // const sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
          // state.client = Stomp.over(sock);
          
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