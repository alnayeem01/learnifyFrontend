import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./index"
import { AudioData } from "../@types/audio"



interface PlaylistModal{
   visible : boolean,
   selectedListId ?: string
};

const initialState :  PlaylistModal ={
   visible: false,
};


const slice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers:{
        updatePlaylistVisibility(state, {payload}: PayloadAction<boolean> ){
            state.visible = payload
        },
        updateSelectedListID(state, {payload}: PayloadAction<string> ){
            state.selectedListId = payload
        },
    }
})

//actions
export const {updatePlaylistVisibility, updateSelectedListID } = slice.actions

export const getModalState = createSelector(
    (state: RootState) => state.modal,
    (modalState) => modalState
)
//reducers
export default slice.reducer