import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import getTimezonesRequest from "../api/timezones/getTimezonesRequest";
import {ItemDefaultProps, TimeZoneProps} from "../types/types";
import isError from "../helpers/isError";

export interface ClocksStateProps {
    items: ItemDefaultProps[]
    timezones: TimeZoneProps[]
    selectValueDefault: string
    error: null | string,
    loading: null | boolean
}

const itemDefault: ItemDefaultProps = {
    city: 'Местное время',
    timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone
};

const initialState: ClocksStateProps = {
    items: [],
    timezones: [],
    selectValueDefault: 'Выберите город',
    loading: null,
    error: null
};

const clocksSlice = createSlice({
    name: 'clocksSlice',
    initialState: initialState,
    reducers: {
        selectTimeZone: (state, {payload}) => {
            state.items = [...state.items, {city: payload.city, timezone: payload.timezone}];
        },
        unSelectTimeZone: (state, {payload}) => {
            state.items = [...state.items.filter(item => item.city !== payload)];
        },
        clearSelect: (state) => {
            state.items = [itemDefault];
        },
        getSelectValue: (state, {payload}) => {
            state.selectValueDefault = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTimezonesRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTimezonesRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.timezones = [...action.payload.data];

                const item = state.timezones.find(item => +item.offset.slice(1) === -new Date().getTimezoneOffset() / 60);

                if (item) {
                    const { name, timezone } = item;

                    state.items = [{city: name, timezone: timezone}];
                    state.selectValueDefault = name;
                } else {
                    state.items = [itemDefault];
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const {
    selectTimeZone,
    unSelectTimeZone,
    clearSelect,
    getSelectValue
} = clocksSlice.actions;

export default clocksSlice.reducer;
