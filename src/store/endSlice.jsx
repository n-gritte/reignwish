import { createSlice } from "@reduxjs/toolkit"
import ends_list from "../data/ends_list"

const initialState = {
    ends: ends_list
}

export const endSlice = createSlice({
    name: "end",
    initialState,
    reducers: {
        createEnd (state, action){
            let end = action.payload;
            state.ends.push(end)
        },
    }
})

export const {createEnd} = endSlice.actions