import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
    name: 'modal',
    initialState: {
        is_modal: false,
    },
    reducers: {
        setModal: (state, action) => {
            state.is_modal = action.payload;
        },
    },
});

export const { 
    setModal,
} = modal.actions;

export default modal.reducer;
