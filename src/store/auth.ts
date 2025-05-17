import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice — empty for now
const initialState = {}

// Creating a slice of the Redux store related to authentication
const slice = createSlice({
    name: "auth",           // Unique name for this slice of the state
    initialState,           // Default state for this slice
    reducers: {}            // Reducers define how state changes — none defined yet
})

export default slice.reducer