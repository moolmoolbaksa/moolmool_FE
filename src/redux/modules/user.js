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

const kakaoLoginApi = createAsyncThunk(
    'user/kakaoLogin',
    async (code, thunkAPI) => {
        try {
            const response = await axios.get(`http://13.124.0.71/user/kakao?code=${code}`);
   
            const token = response.headers.authorization;
            localStorage.setItem("token", token)
            
            thunkAPI.dispatch(loginCheckApi());
            
            if(response.data.isFirst){
                history.replace('/address');
            } else {
                history.replace('/');
            }
            console.log(response)
        } catch (error) {
            console.log("kakaologin error: ", error);
            alert('kakaologin error');
        }
    }
);

const setFirstUserInfoApi = createAsyncThunk(
    'user/setFirstUserInfoApi',
    async (address) => {
        console.log(address)
        try {
            const response = await axios.put('http://13.124.0.71/user/info',{address},{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            history.replace('/welcome');
            console.log(response)
        } catch (error) {
            console.log("setFirstUserInfoApi error: ", error);
            alert('setFirstUserInfoApi error');
        }
    }
);

// const setFirstUserInfoApi = createAsyncThunk(
//     'user/setFristUserInfo',
//     async (preview, introduce) => {
//         const token = localStorage.getItem("token");
//         const formData = new FormData();
//         formData.append('profile', preview);
//         formData.append('storeInfo', introduce);
//         formData.append('address', '');
//         try {
//             const response = await axios.put(`http://13.124.0.71/user/info`,formData,{
//                 headers: {
//                     Authorization: token,
//                     // 'Content-Type' : 'multipart/form-data'
//                 }
//             });
//             console.log(response)
//             // if(response.data.ok){
//             //     history.replace('/');
//             // }
//         } catch (error) {
//             console.log("setFirstUserInfo: ", error);
//             alert('setFirstUserInfo error');
//         }
//     }
// );

const getMyInfoApi = createAsyncThunk(
    'user/getMyInfo',
    async () => {
        try {
            const response = await axios.get('http://13.124.0.71/api/mypage',{
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("getMyInfo: ", error);
            alert('getMyInfo error');
        };
    }
);

const updateMyInfoApi = createAsyncThunk(
    'user/updateMyInfoApi',
    async ({nickname, storeInfo, profile}, thunkAPI) => {
        
        const formData = new FormData();
        
        formData.append('nickname', nickname);
        formData.append('profile', profile);
        formData.append('address', 'zzz');
        formData.append('storeInfo', storeInfo);
        // for (let key of formData.keys()) { console.log(key, ":", formData.get(key)); }
        try {
            const response = await axios.put('http://13.124.0.71/api/mypage',formData,{
                headers: {
                    Authorization: localStorage.getItem('token'),
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("updateMyInfoApi: ", error);
            alert('updateMyInfoApi error');
        };
    }
);

const getCounterUserInfoApi = createAsyncThunk(
    'user/getCounterUserInfoApi',
    async (userId) => {
        console.log(userId)
        try {
            const response = await axios.get(`http://13.124.0.71/api/store/${userId}`);
            history.push(`/mall/${userId}`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log("getCounterUserInfoApi: ", error);
            alert('getCounterUserInfoApi error');
        };
    }
);

export const user = createSlice({
    name: 'user',
    initialState: {
        user_info: {
            nickname: "",
            profile: "",
            store_info: "",
            address: "",
            degree: "",
            grade: "",
        },
        other: {
            nickname: "",
            profile: "",
            store_info: "",
            address: "",
            degree: "",
            grade: "",
            other_item_list: [],
        },
        address: "",
        item_list: [],
        myScrabList: [],
        preview: "",
        is_login: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user.nickname = action.payload.nickname;
            state.user.profile = action.payload.profile;
            state.is_login = true;
        },
        setPreview: (state, action) => {
            state.preview = action.payload;
        },
        setIntroduce: (state, action) => {
            state.user.store_info = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCheckApi.fulfilled, (state, action) => {
                state.user_info.nickname = action.payload.nickname;
                state.user_info.profile = action.payload.profile;
                state.is_login = true;
            })
            .addCase(getMyInfoApi.fulfilled, (state, action) => {
                const {itemList, myScrabList, ...user_info} = action.payload;
                state.user_info = user_info;
                state.item_list = itemList;
                state.myScrabList = myScrabList;
            })
            // .addCase(updateMyInfoApi.fulfilled, (state, action) => {
            //     const {itemList, myScrabList, ...user_info} = action.payload;
            //     state.user_info = user_info;
            //     state.item_list = itemList;
            //     state.myScrabList = myScrabList;
            // })
            .addCase(getCounterUserInfoApi.fulfilled, (state, action) => {
                const {itemList, ...other_info} = action.payload;
                state.other = other_info;
                state.other.other_item_list = itemList;
            })
    }
});

export const { 
    setPreview,
    setIntroduce,
    setAddress,
} = user.actions;

export const api = {
    loginCheckApi,
    kakaoLoginApi,
    setFirstUserInfoApi,
    getMyInfoApi,
    updateMyInfoApi,
    getCounterUserInfoApi,
};

export default user.reducer;