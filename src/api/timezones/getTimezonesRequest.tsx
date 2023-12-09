import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const getTimezonesRequest = createAsyncThunk('clocksSlice/getTimezonesRequest', async (_, { rejectWithValue }) => {
    try {
        const data = await axios.get("/api/timezones");

        return data;
    } catch(error) {
        return rejectWithValue('Server Error');
    }
});

export default getTimezonesRequest;
