import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    uploading: false,
    src: "http://kaihuastudio.com/common/img/default_profile.png" 
};

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setPreview: (state, action) => {
            state.src = action.payload;
        },
    },
});

export const { setPreview } = imageSlice.actions;

export default imageSlice.reducer;