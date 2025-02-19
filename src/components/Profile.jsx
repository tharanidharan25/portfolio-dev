import React from "react";
import { useSelector } from "react-redux";

export default function Profile(){
    const profile = useSelector((store)=>store.profile);
    return (
        <div className="profile-container">
            <h1>{profile.name}</h1>
            <p>{profile.mobileNo}</p>
            <p>{profile.emailId}</p>
            <p><a>{profile.linkedIn}</a></p>
            <p>{profile.dob}</p>
            <p>{profile.description}</p>
        </div>
    )
}