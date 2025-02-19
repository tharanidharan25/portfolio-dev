import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    education: [
        {
            level: "10th Grade",
            institution: "Vethathiri Maharishi Matric Hr.Sec School",
            yearOfPassing: 2016,
            score: "98%"
        },
        {
            level: "12th Grade",
            institution: "Vethathiri Maharishi Matric Hr.Sec School",
            yearOfPassing: 2018,
            score: "94.75%"
        },
        {
            level: "Undergraduate Degree",
            dept: "Computer Science and Engineering",
            institution: "Coimbatore Institute of Technology",
            yearOfPassing: 2022,
            score: 7.5
        }
    ]
}

const educationSlice = createSlice({
    name: 'Education',
    initialState,
    reducers: {}
});

export default educationSlice.reducer