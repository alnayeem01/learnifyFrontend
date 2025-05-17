import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index'

// Define the shape of a user profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  followers: number;
  following: number;
}

// Define the shape of the auth-related state
interface AuthState {
  profile: UserProfile | null; // User's profile info, null if not logged in
  loggedIn: boolean;           // Whether the user is logged in
}

// Initial/default state for the auth slice
const initialState: AuthState = {
  profile: null,
  loggedIn: false,
};

// Create the auth slice using Redux Toolkit
const slice = createSlice({
  name: 'auth',           // Unique name for this slice of the global state
  initialState,           // The starting state
  reducers: {
    // Reducer to update user profile
    updateProfile(authState, { payload }: PayloadAction<UserProfile | null>) {
      authState.profile = payload; // Set the profile to the new value or null
    },
    // Reducer to update login status
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload; // Set the logged-in flag (true/false)
    },
  },
});

// Actions — auto-generated action creators from reducers
export const { updateProfile, updateLoggedInState } = slice.actions;


// Selector to get the entire auth state from the Redux store using createSelector for memoization
export const getAuthState = createSelector(
    (state : RootState)=> state,       // Input selector: takes the whole state
    (authState)=> authState            // Output selector: returns the auth state slice
)

// Reducer — to be registered in the store
export default slice.reducer;
