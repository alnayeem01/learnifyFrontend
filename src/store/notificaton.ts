import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./index"


type notificationType = 'error' | 'success'

interface Notification{
    message: string,
    type: notificationType
}

const initialState : Notification={
    message: "",
    type: 'error'
}


const slice = createSlice({
    name: 'notifcation',
    initialState: initialState,
    reducers:{
        updateNotification(notificationState, {payload}: PayloadAction<Notification> ){
            notificationState.message = payload.message
            notificationState.type = payload.type
        }
    }
})

//actions
export const { updateNotification} = slice.actions

export const getNotificationState = createSelector(
    (state: RootState) => state.notification,
    (notifcation) => notifcation
)
//reducers
export default slice.reducer