import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import TitleBar from "./TitleBar"
import Navbar from "./NavBar/Navbar"
import Content from "./Content/Content"
import { updateIsMobile } from "../redux/slices/appSlice"

export default function Layout() {
    const dispatch = useDispatch()
    const navBarRef = useRef(null)

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }

    useEffect(() => {
        dispatch(updateIsMobile(isMobile()))
    }, [])

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
                        navBarRef={navBarRef}
                    />
                    <Content
                        reachedTop={reachedTop}
                        reachedEnd={reachedEnd}
                        setReachedTop={setReachedTop}
                        setReachedEnd={setReachedEnd}
                        navBarRef={navBarRef}
                    />
                </div>
            </>
        </div>
    )
}