import { createSlice } from "@reduxjs/toolkit";
import characters_list from "../data/characters_list";
const initialState = {
    characters: characters_list
}

export const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        createCharacter (state, action){
            let character = action.payload;
            state.characters.push(character)
        },
    }
})

export const { createCharacter} = characterSlice.actions