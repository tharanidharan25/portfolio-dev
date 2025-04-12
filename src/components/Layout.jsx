import React, { useState } from "react"
import { useSelector } from "react-redux"
import TitleBar from "./TitleBar"
import Navbar from "./Navbar"
import Content from "./Content/Content"

export default function Layout() {
    const { theme } = useSelector((store) => store.theme);

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }

    const [reachedTop, setReachedTop] = useState(true);
    const [reachedEnd, setReachedEnd] = useState(false);

    return (
        <div className="page-container">
            <>
                <TitleBar />
                <div className="page-content">
                    <Navbar 
                        setReachedTop={setReachedTop}
                        setReachedEnd={setReachedEnd}
                    />
                    <Content 
                        reachedTop={reachedTop}
                        reachedEnd={reachedEnd}
                        setReachedTop={setReachedTop}
                        setReachedEnd={setReachedEnd}
                    />
                </div>
            </>
        </div>
    )
}