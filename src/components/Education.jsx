import React from "react";
import { useSelector } from "react-redux";

export default function Education() {

    const education = useSelector((store) => store.education);

    // console.log(education)

    return (
        <h1>Education Details here...</h1>
    )
}