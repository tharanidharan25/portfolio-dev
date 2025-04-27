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
    setReachedEnd,
    navBarRef
}) {

    const dispatch = useDispatch();
    const currTab = useSelector(state => state.nav.currentTab);
    const isMobile = useSelector(state => state.app.isMobile);

    const handleTabClick = (newValue) => {
        if (newValue === currTab) {
            dispatch(updateCurrentTab(null))
        } else {
            dispatch(updateCurrentTab(newValue))
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
        <div ref={navBarRef} className="navbar">
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