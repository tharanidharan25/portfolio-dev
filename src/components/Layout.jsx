import React, { useEffect, useRef } from "react"
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


    return (
        <div className="page-container">
            <>
                <TitleBar />
                <div className="page-content">
                    <Navbar
                        navBarRef={navBarRef}
                    />
                    <Content
                        navBarRef={navBarRef}
                    />
                </div>
            </>
        </div>
    )
}