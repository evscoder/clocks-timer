import { configureStore } from '@reduxjs/toolkit';
import clocksSlice from "./redux/clocksSlice";

const store = configureStore({
    reducer: {
        clocksSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

