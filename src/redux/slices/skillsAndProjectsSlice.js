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
            label: 'HTML5',
            level: '90%'
        }, {
            id: 'css',
            label: 'CSS3',
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
        title: "AP Automation",
        techStack: ['React.Js', 'Redux Toolkit', 'Material UI'],
        content: [{
            contentId: 1,
            data: 'Cloud based accounts payable automation software captures invoices digitally, enabling touchless processing, approval and posting.'
        }, {
            contentId: 2,
            data: 'Reduced Invoice Processing Costs by 85%, Features Real-time tracking and automated workflows'
        }, {
            contentId: 3,
            data: 'Developed Invoice Management, SLA charts and Rule-based NON-PO coding systems for improved efficiency.'
        }]
    }, {
        id: 'portfolio',
        title: "Portfolio Site",
        techStack: ['React.Js', 'Redux Toolkit', 'Framer Motion'],
        content: [{
            contentId: 4,
            data: 'VS Code Themed portfolio site includes Profile, Skills, Projects, Education and more.'
        }, {
            contentId: 5,
            data: 'The portfolio site highlights my skills in creating dynamic, visually engaging websites, with a focus on performance optimization, and smooth animations.'
        }, {
            contentId: 6,
            data: 'Serves as a comprehensive display of my capabilities, from front-end design to advanced React functionality, with an emphasis on user-centric experiences.'
        }]
    }]
}

const skillsAndProjectsSlice = createSlice({
    name: 'skillsAndProjects',
    initialState,
    reducers: {}
})

export default skillsAndProjectsSlice.reducer;


// https://tympanus.net/Development/ImageRevealHover/
// https://www.hover.dev/components/links