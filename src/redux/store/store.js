import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice"
import profileSlice from "../slices/profileSlice";
import educationSlice from "../slices/educationSlice";
import appSlice from "../slices/appSlice";
import navSlice from "../slices/navSlice";
import contentSlice from "../slices/contentSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        profile: profileSlice,
        education: educationSlice,
        app: appSlice,
        nav: navSlice,
        content: contentSlice
    }
})