import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fileTree: [
        {
            name: 'Portfolio',
            key: 'portfolio',
            files: [{
                id: 'profile',
                label: 'Profile.js',
                fileType: 'js'
            }, {
                id: 'skillsAndProjects',
                label: 'Skills and Projects.js',
                fileType: 'js'
            }, {
                id : 'education',
                label: 'Education.js',
                fileType: 'js'
            }, {
                id: 'resume',
                label: 'Resume.pdf',
                fileType: 'pdf'
            }],
            isExpanded: true,
        }
    ],
    currentTab: 'files', // Possible values - files, search, git
}

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        updateFileTree: (state, { payload }) => {
            state.fileTree[payload.idx][payload.field] = payload.value
        },
        updateCurrentTab: (state, { payload }) => {
            state.currentTab = payload
        }
    }
})

export const {
    updateFileTree,
    updateCurrentTab
} = navSlice.actions;

export default navSlice.reducer