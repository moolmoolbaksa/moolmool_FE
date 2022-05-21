import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
    name: 'modal',
    initialState: {
        is_login_modal: false,
        is_delete_modal: false,
        is_trade_modal: false,
        is_alert_modal: false,
        is_report_modal: false,
    },
    reducers: {
        setLoginModal: (state, action) => {
            state.is_login_modal = action.payload;
        },
        setDeleteModal: (state, action) => {
            state.is_delete_modal = action.payload;
        },
        setTradeModal: (state, action) => {
            state.is_trade_modal = action.payload;
        },
        setAlertModal: (state, action) => {
            state.is_alert_modal = action.payload;
        },
        setReportModal: (state, action) => {
            state.is_report_modal = action.payload;
        },
    },
});

export const { 
    setLoginModal,
    setDeleteModal,
    setTradeModal,
    setAlertModal,
    setReportModal,
} = modal.actions;

export default modal.reducer;
