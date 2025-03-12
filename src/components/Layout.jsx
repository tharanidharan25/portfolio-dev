import React from "react"
import { useSelector } from "react-redux"
import TitleBar from "./TitleBar"
import Navbar from "./Navbar"
import Content from "./Content/Content"

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