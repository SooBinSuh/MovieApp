import { configureStore } from "@reduxjs/toolkit";
import userStore from "./userStore";
import { movieApi } from "../services/movieService";

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer:{
        user: userStore,
        [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

  

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)