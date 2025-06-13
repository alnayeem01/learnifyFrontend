import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./index"
import { AudioData } from "../@types/audio"



interface Player{
   onGoingAudio : AudioData | null
};

const initialState : Player={
    onGoingAudio : null
};


const slice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers:{
        updateOnGoingAudio(playerState, {payload}: PayloadAction<AudioData | null> ){
            playerState.onGoingAudio = payload
        }
    }
})

//actions
export const { updateOnGoingAudio} = slice.actions

export const getPlayerState = createSelector(
    (state: RootState) => state.player,
    (playerState) => playerState
)
//reducers
export default slice.reducer