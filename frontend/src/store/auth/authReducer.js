import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const loginAsync = createAsyncThunk(
    'auth/login',
    async (payload) => {
        const res = await axios.post('http://localhost:2000/login', payload);
        localStorage.setItem('id', res.data['data']['_id']);
    }
);


export const registrationAsync = createAsyncThunk('auth/registration',
    async(payload)=> {
        const res = await axios.post('http://localhost:2000/register', payload);
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginAsync.fulfilled, (state) => {
            state.isAuthenticated = true;
        })
        .addCase(loginAsync.rejected, (state) => {
            state.isAuthenticated = false;
        });

        builder
        .addCase(registrationAsync.fulfilled, (state)=>{
            state.isAuthenticated = true;
        })
        .addCase(registrationAsync.rejected, (state)=>{
            state.isAuthenticated = false;
        });

    }
})

export const {login, logout, registration} = authSlice.actions;
export default authSlice.reducer;