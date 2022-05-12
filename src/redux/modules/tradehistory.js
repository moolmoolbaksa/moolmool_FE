
import {createSlice} from "@reduxjs/toolkit";




const initialState={

    tradehistory: [],
    Senthistory:[],
    Recivedhistory:[],
}


export const tradehistory = createSlice({
    name: 'tradehistory',
    initialState,
    reducers: {

        setHistory:(state,action)=>{
            action.payload.forEach( history => {
                history.myPosition==="buyer"?state.Senthistory.push(history):state.Recivedhistory.push(history);
                // console.log(state.Senthistory);
                
            });
        },
        delHistory:(state,action)=>{
            action.payload.myPosition=="buyer"?
            state.Senthistory=state.Senthistory.filter(history => (history.barterId !== action.payload.barterId))
            :state.Recivedhistory=state.Recivedhistory.filter(history => (history.barterId !== action.payload.barterId));
        },
        acceptTrade:(state,action)=>{
            action.payload.myPosition=="buyer"?(
            state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.status+=1:""))
            :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.status+=1:""));

            
        },
        completeTrade:(state,action)=>{
            action.payload.myPosition=="buyer"?(
            state.Senthistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=true:""))
            :(state.Recivedhistory.forEach(history=>action.payload.barterId===history.barterId?history.isTrade=true:""));  
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

} = tradehistory.actions;

export default tradehistory.reducer;