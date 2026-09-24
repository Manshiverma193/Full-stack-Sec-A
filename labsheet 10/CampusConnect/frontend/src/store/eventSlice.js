import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({

    name: "events",

    initialState: {

        events: [],

        loading: false

    },

    reducers: {

        setEvents: (
            state,
            action
        ) => {

            state.events =
                action.payload;

        },

        setLoading: (
            state,
            action
        ) => {

            state.loading =
                action.payload;

        }

    }

});

export const {
    setEvents,
    setLoading
} = eventSlice.actions;

export default eventSlice.reducer;
