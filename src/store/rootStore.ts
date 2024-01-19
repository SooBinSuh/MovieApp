import { configureStore } from "@reduxjs/toolkit";
import userStore from "./userStore";


export const store = configureStore({
    reducer:{
        user: userStore
    }
})

export type RootState = ReturnType<typeof store.getState>
