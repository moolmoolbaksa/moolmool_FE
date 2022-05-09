import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
    name: 'modal',
    initialState: {
        is_login_modal: false,
        is_delete_modal: false,
    },
    reducers: {
        setLoginModal: (state, action) => {
            state.is_login_modal = action.payload;
        },
        setDeleteModal: (state, action) => {
            state.is_delete_modal = action.payload;
        }
    },
});

export const { 
    setLoginModal,
    setDeleteModal,
} = modal.actions;

export default modal.reducer;
