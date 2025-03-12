import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    skills: [{
        id: 'programmingLanguages',
        label: 'Programming Languages',
        content:[{
            id: 'python',
            label: 'Python',
            level: '90%'
        }, {
            id: 'javaScript',
            label: 'JavaScript',
            level: '90%'
        }]
    }, {
        id: 'technologies',
        label: 'Technologies',
        content: [{
            id: 'react',
            label: "React.Js",
            level: '80%'
        }, {
            id: 'redux',
            label: 'Redux Toolkit',
            level: '80%'
        }, {
            id: 'html',
            label: 'HTML',
            level: '90%'
        }, {
            id: 'css',
            label: 'CSS',
            level: '90%'
        }]
    }],
    projects: []
}

const skillsAndProjectsSlice = createSlice({
    name: 'skillsAndProjects',
    initialState,
    reducers: {}
})

export default skillsAndProjectsSlice.reducer;