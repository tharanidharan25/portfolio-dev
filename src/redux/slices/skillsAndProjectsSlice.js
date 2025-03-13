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
    }, {
        id: 'tools',
        label: 'Tools',
        content: [{
            id: 'git',
            label: 'Git',
            level: '80%'
        }, {
            id: 'postmanHoppscotch',
            label: 'Postman/Hoppscotch',
            level: '80%'
        }, {
            id: 'chromeDevTools',
            label: 'Chrome Dev Tools',
            level: '80%'
        }, {
            id: 'azuredevops',
            label: 'Azure DevOps',
            level: '80%'
        }, {
            id: 'vscode',
            label: 'VS Code',
            level: '80%'
        }]
    }, {
        id: 'otherskills',
        label: 'Other Skills',
        content: [{
            id: 'dataStructures',
            label: 'Data Structures and Algorithms',
            level: '80%'
        }, {
            id: 'problemSolving',
            label: 'Problem Solving',
            level: '80%'
        }, {
            id: 'apiIntegration',
            label: 'RESTful API Integration',
            level: '90%'
        }, {
            id: 'responsiveWebDev',
            label: 'Responsive Web Development',
            level: '80%'
        }]
    }],
    projects: [{
        id: 'apAutomation',
        label: "AP Automation",
        
    }]
}

const skillsAndProjectsSlice = createSlice({
    name: 'skillsAndProjects',
    initialState,
    reducers: {}
})

export default skillsAndProjectsSlice.reducer;