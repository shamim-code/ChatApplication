import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import { thunk } from 'redux-thunk'; // Use named import for redux-thunk

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
