import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Tharanidharan Ponselvam',
    data: [{
        id: 'about',
        title: 'About',
        subTitle: "I’m a Frontend Developer Who Loves Turning Ideas into Interactive Websites!",
        content: "With 2 years of hands-on experience, I specialize in crafting sleek, user-first websites with HTML, CSS, JavaScript, React.js, and Redux Toolkit. I’m all about translating those detailed Figma designs into flawless, responsive websites that keep users engaged. I’m constantly learning and staying up-to-date with new tools and technologies to ensure I’m always bringing fresh ideas to the table. When I’m not in the code zone, you’ll find me cheering on a Cricket or Football match, catching the latest movie, or diving into something new to learn.",
        footer: "Let’s create something amazing together!",
        style: {
            gridColumn: '1 / -1',
        },
    }, {
        id: 'contact',
        title: 'Contact',
        contacts: [{
            id: 'mail',
            icon: 'mailIcon',
            background: 'rgb(199, 22, 16)',
            iconColor: '#fff',
            link: 'mailto:tharanidharan.ponselvam@gmail.com',
            copyLink: 'tharanidharan.ponselvam@gmail.com',
            hoverBgColor: 'rgb(0, 0, 0, 30)',
            borderColor: 'rgb(199, 22, 16)',
            toastName: 'Mail ID'
        }, {
            id: 'linkedIn',
            icon: 'linkedInIcon',
            background: '#0077B5',
            iconColor: '#fff',
            link: 'https://www.linkedin.com/in/tharanidharan-ponselvam/',
            copyLink: 'https://www.linkedin.com/in/tharanidharan-ponselvam/',
            hoverBgColor: 'rgb(0, 0, 0, 30)',
            borderColor: '#0077B5',
            toastName: 'LinkedIn profile link'
        }, {
            id: 'gitHub',
            icon: 'gitHubIcon',
            background: 'rgb(37 36 36)',
            iconColor: '#fff',
            link: 'https://github.com/tharanidharan25',
            copyLink: 'https://github.com/tharanidharan25',
            hoverBgColor: 'rgb(0, 0, 0, 30)',
            borderColor: '#fff',
            toastName: 'GitHub profile link'
        }, {
            id: 'leetcode',
            icon: 'leetcodeIcon',
            background: 'rgb(37 36 36)',
            iconColor: '#fea116',
            link: 'https://leetcode.com/u/Tharanidharan/',
            copyLink: 'https://leetcode.com/u/Tharanidharan/',
            hoverBgColor: 'rgb(0, 0, 0, 30)',
            borderColor: '#fea116',
            toastName: 'Leetcode profile link'
        }],
        style: {
            gridColumn: '1 / -1'
        }
    }],
    address: 'Some Address for now',
    job: "Front-End Developer",
    mobileNo: '+91 8667019739',
    emailId: 'tharanitharan71@gmail.com',
    dob: '25/02/2001',
    linkedIn: 'some link',
    description: 'some description',
    hobbies: ['Reading Books', 'Watching Movies', 'Listening to Music']
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {}
})

export default profileSlice.reducer;