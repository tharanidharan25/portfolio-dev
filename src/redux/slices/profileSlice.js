import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Tharanidharan Ponselvam',
    data: [{
        id: 'about',
        title: 'About',
        subTitle: "I’m a Frontend Developer Who Loves Turning Ideas into Interactive Websites!",
        content: "With 2 years of hands-on experience, I specialize in crafting sleek, user-first websites with HTML, CSS, JavaScript, React.js, and Redux Toolkit. I’m all about translating those detailed Figma designs into flawless, responsive websites that keep users engaged. I’m constantly learning and staying up-to-date with new tools and technologies to ensure I’m always bringing fresh ideas to the table. Whether I’m debugging with Chrome DevTools, coding in VS Code, or version-controlling with GitHub, I’m dedicated to delivering the best possible user experience. When I’m not in the code zone, you’ll find me cheering on a Cricket or Football match, catching the latest movie, or diving into something new to learn.",
        footer: "Let’s create something amazing together!",
        style: {
            gridColumn: '1 / -1',
        },
    },{
        id: 'about',
        title: 'About',
        subTitle: "I’m a Frontend Developer Who Loves Turning Ideas into Interactive Websites!",
        content: "With 2 years of hands-on experience, I specialize in crafting sleek, user-first websites with HTML, CSS, JavaScript, React.js, and Redux Toolkit. I’m all about translating those detailed Figma designs into flawless, responsive websites that keep users engaged. I’m constantly learning and staying up-to-date with new tools and technologies to ensure I’m always bringing fresh ideas to the table. Whether I’m debugging with Chrome DevTools, coding in VS Code, or version-controlling with GitHub, I’m dedicated to delivering the best possible user experience. When I’m not in the code zone, you’ll find me cheering on a Cricket or Football match, catching the latest movie, or diving into something new to learn.",
        footer: "Let’s create something amazing together!",
        style: {
            gridColumn: 'span 1',
        },
    },{
        id: 'about',
        title: 'About',
        subTitle: "I’m a Frontend Developer Who Loves Turning Ideas into Interactive Websites!",
        content: "With 2 years of hands-on experience, I specialize in crafting sleek, user-first websites with HTML, CSS, JavaScript, React.js, and Redux Toolkit. I’m all about translating those detailed Figma designs into flawless, responsive websites that keep users engaged. I’m constantly learning and staying up-to-date with new tools and technologies to ensure I’m always bringing fresh ideas to the table. Whether I’m debugging with Chrome DevTools, coding in VS Code, or version-controlling with GitHub, I’m dedicated to delivering the best possible user experience. When I’m not in the code zone, you’ll find me cheering on a Cricket or Football match, catching the latest movie, or diving into something new to learn.",
        footer: "Let’s create something amazing together!",
        style: {
            gridColumn: 'span 1',
        },
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