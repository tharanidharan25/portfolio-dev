import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "Default"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDefault: (state) => {
            state.theme = "Default"
        },
        setTheme: (state, {payload}) => {
            const selectedTheme = payload.selectedTheme;
            state.theme = selectedTheme;
        }
    }
});

export const { setDefault, setTheme } = themeSlice.actions;
export default themeSlice.reducer;