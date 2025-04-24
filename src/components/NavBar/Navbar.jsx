import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';

import {
    VscFiles,
    VscSearch,
    VscSourceControl
} from "react-icons/vsc";

import { updateCurrentTab } from "../../redux/slices/navSlice";
import NavBarTabContent from "./NavBarTabContent";

const tabs = [
    {
        name: 'files',
        icon: <VscFiles className="navbar-icons" />
    },
    {
        name: 'search',
        icon: <VscSearch className="navbar-icons" />
    },
    {
        name: 'git',
        icon: <VscSourceControl className='navbar-icons' />
    }
];

export default function Navbar({
    setReachedTop,
    setReachedEnd
}) {

    const dispatch = useDispatch();
    const currTab = useSelector(state => state.nav.currentTab);
    const isMobile = useSelector(state => state.app.isMobile);
    const navBarTabContent = document.getElementById("navBarTabContent");
    const pageContent = document.getElementById("pageContent");
    const navBar = document.getElementById("navBar");

    const clickOutside = (event) => {
        if (
            navBarTabContent &&
            navBarTabContent.open &&
            !navBarTabContent.contains(event.target) &&
            event.target !== navBarTabContent &&
            event.target !== navBar
        ) {
            dispatch(updateCurrentTab(null))
            navBarTabContent.close()
        }
    }

    if (isMobile) {
        pageContent.addEventListener('pointerdown', clickOutside)
    }

    const handleTabClick = (newValue) => {
        if (newValue === currTab) {
            if (isMobile && navBarTabContent) {
                navBarTabContent.close()
            }
            dispatch(updateCurrentTab(null))
            return
        }
        dispatch(updateCurrentTab(newValue))
        if (isMobile) {
            navBarTabContent.show()
        }
    }

    const getTabs = () => {
        return (
            tabs.map(eachTab => (
                <button
                    key={eachTab.name}
                    className={`tab-btn ${eachTab.name === currTab && 'selected'}`}
                    onClick={() => handleTabClick(eachTab.name)}
                    style={{
                        position: 'relative'
                    }}
                >
                    {
                        eachTab.name === currTab &&
                        (<AnimatePresence mode="popLayout" initial={false} >
                            <motion.span
                                key={eachTab.name}
                                layoutId="selectedTab"
                                style={{
                                    background: '#eeffff',
                                    position: "absolute",
                                    width: '1px',
                                    height: '100%',
                                    inset: 0,
                                    zIndex: 10,
                                }}
                                initial={{ opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.5,
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            />
                        </AnimatePresence>)
                    }
                    {eachTab.icon}
                </button>
            ))
        )
    }


    return (
        <div id="navBar" className="navbar">
            <div className="tabs-container">
                {getTabs()}
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
                {(!isMobile && currTab) && <NavBarTabContent
                    setReachedTop={setReachedTop}
                    setReachedEnd={setReachedEnd}
                    isVisible={currTab && !isMobile}
                />}
            </AnimatePresence>
        </div>
    )
}