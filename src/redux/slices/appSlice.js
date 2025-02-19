import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowWidth: window.innerWidth,
    fullScreened: false,
    content: 'profile'
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        updateWindowWidth: (state, { payload }) => {
            state.windowWidth = payload;
        },
        updateFullScreened: (state, { payload }) => {
            state.fullScreened = payload;
        },
        updateContent: (state, { payload }) => {
            state.content = payload;
        }
    }
})

export const {
    updateWindowWidth,
    updateFullScreened,
    updateContent
} = appSlice.actions;

export default appSlice.reducer;