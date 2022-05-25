import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_login_modal: false,
    is_delete_modal: false,
    is_trade_modal: false,
    is_alert_modal: false,
    is_drawer: false,
    report_modal: {
        is_report_modal: false,
        content: '',
        itemId: '',
    },
};

export const modal = createSlice({
    name: 'modal',
    initialState,
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
        setDrawer: (state, action) => {
            state.is_drawer = action.payload;
        },
        setReportModal: (state, action) => {
            state.report_modal = action.payload;
        },
        deleteReportModal: (state, action) => {
            state.report_modal = initialState.report_modal;
        }
    },
});

export const { 
    setLoginModal,
    setDeleteModal,
    setTradeModal,
    setAlertModal,
    setDrawer,
    setReportModal,
    deleteReportModal
} = modal.actions;

export default modal.reducer;
