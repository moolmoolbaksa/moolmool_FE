import {createSlice} from "@reduxjs/toolkit";

const initialState={
    tradehistory: [],
    Senthistory:[],
    Recivedhistory:[],
    Checkhistory: {
        userId: '',
        nickname: '',
        degree: '',
        title: '',
        contents: '',
        image: '',
        opponentNickname: '',
        barterItem: [],
    },
};

export const tradehistory = createSlice({
    name: 'tradehistory',
    initialState,
    reducers: {
        setHistory:(state,action)=>{
            state.Senthistory = action.payload.filter(v => v.myPosition === 'buyer');
            state.Recivedhistory = action.payload.filter(v => v.myPosition === 'seller');
        },
        getCheckHistory:(state, action) => {
            state.Checkhistory = action.payload;
        },
        delHistory:(state,action)=>{
            action.payload.myPosition==="buyer"?
            state.Senthistory=state.Senthistory.filter(history => (history.barterId !== action.payload.barterId))
            :state.Recivedhistory=state.Recivedhistory.filter(history => (history.barterId !== action.payload.barterId));
        },
        acceptTrade:(state,action)=>{
            action.payload.myPosition==="buyer"?(
            state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.status+=1:""))
            :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.status+=1:""));  
        },
        completeTrade:(state,action)=>{
            action.payload.myPosition==="buyer"?(
            state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=true:""))
            :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=true:""));  
        },
        cancelCompleteTrade:(state,action)=>{
            action.payload.myPosition==="buyer"?(
            state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=false:""))
            :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=false:""));  
        },
        rateTrade:(state,action)=>{
          action.payload.myPosition==="buyer"?(
          state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.isScore=true:""))
          :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.isScore=true:""));  
        },
        setOppentisTrade:(state,action)=>{
          action.payload.myPosition==="buyer"?(
          state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.userIsTrade=action.payload.userIsTrade:""))
          :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.userIsTrade=action.payload.userIsTrade:""));  
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
    setHistory,
    delHistory,
    completeTrade,
    acceptTrade,
    getCheckHistory,
    cancelCompleteTrade,
    rateTrade,
    setOppentisTrade,
} = tradehistory.actions;

export default tradehistory.reducer;