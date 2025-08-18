import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./index"
import { AudioData } from "../@types/audio"



interface Player{
   onGoingAudio : AudioData | null;
   onGoingList : AudioData [],
   playBackRate: number
};

const initialState : Player={
    onGoingAudio : null,
    onGoingList : [],
     playBackRate: 1
};


const slice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers:{
        updateOnGoingAudio(playerState, {payload}: PayloadAction<AudioData | null> ){
            playerState.onGoingAudio = payload
        },
         updateOnGoingList(playerState, {payload}: PayloadAction<AudioData []> ){
            playerState.onGoingList = payload
        },
        updatePlaybackRate(playerState, {payload}: PayloadAction<number> ){
            playerState.playBackRate = payload
        }
    }
})

//actions
export const { updateOnGoingAudio, updateOnGoingList, updatePlaybackRate} = slice.actions

export const getPlayerState = createSelector(
    (state: RootState) => state.player,
    (playerState) => playerState
)
//reducers
export default slice.reducer