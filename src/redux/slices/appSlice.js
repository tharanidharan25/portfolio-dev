import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowWidth: window.innerWidth,
    fullScreened: false,
    content: 'profile',
    isMobile: false
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
        },
        updateIsMobile: (state, { payload }) => {
            state.isMobile = payload
        }
    }
})

export const {
    updateWindowWidth,
    updateFullScreened,
    updateContent,
    updateIsMobile
} = appSlice.actions;

export default appSlice.reducer;