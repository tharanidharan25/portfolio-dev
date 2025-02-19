import React from "react";
import { useSelector } from "react-redux";
import TitleBar from "./TitleBar";
import Navbar from "./Navbar";
import Profile from './Profile'
import Education from './Education'
import Projects from './Projects'
import Skills from './Skills'
import Interests from './Interests'

export default function Layout() {
    const { theme } = useSelector((store) => store.theme);

    const content = useSelector(state => state.app.content)

    return (
        <div className="page-container">
            <TitleBar />
            <div className="page-content">
                <Navbar />
                <div className="content">
                    <main>
                        {content == 'profile' && <Profile />}
                        {content == 'education' && <Education />}
                        {content == 'projects' && <Projects />}
                        {content == 'skills' && <Skills />}
                        {content == 'interests' && <Interests />}
                    </main>
                </div>
            </div>
        </div>
    )
}