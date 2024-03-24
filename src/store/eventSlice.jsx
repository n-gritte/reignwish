import { createSlice } from "@reduxjs/toolkit";
import events_list from "../data/events_list";

const initialState = {
    events: events_list
}

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        createEvent (state, action){
            let event = action.payload;
            state.events.push(event)
        },
    }
})

export const {createEvent} = eventSlice.actions