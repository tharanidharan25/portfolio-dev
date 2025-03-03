import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Tharanidharan Ponselvam',
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