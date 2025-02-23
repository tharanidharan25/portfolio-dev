import React from "react";
import { useSelector } from "react-redux";
import TitleBar from "./TitleBar";
import Navbar from "./Navbar";
import Profile from './Profile'
import Education from './Education'
import Projects from './Projects'
import Skills from './Skills'
import Interests from './Interests'
import Content from "./Content/Content";

export default function Layout() {
    const { theme } = useSelector((store) => store.theme);

    return (
        <div className="page-container">
            <TitleBar />
            <div className="page-content">
                <Navbar />
                <Content />
            </div>
        </div>
    )
}