import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce, throttle } from "lodash";
import { AnimatePresence, motion } from 'motion/react';

import Profile from "../Profile";
import Education from "../Education";
import SkillsAndProjects from "../SkillsAndProjects/SkillsAndProjects";

import { addOpenedTabs, closeOpenedTab } from "../../redux/slices/contentSlice";
import ContentNav from "./ContentNav";
import Resume from "../Resume/Resume";
import NavBarTabContent from "../NavBar/NavBarTabContent";
import { updateCurrentTab } from "../../redux/slices/navSlice";

export class Node {
    constructor(element) {
        this.data = element;
        this.next = null;
        this.prev = null;
    }
}

export default function Content({
    reachedTop,
    reachedEnd,
    setReachedTop,
    setReachedEnd,
    navBarRef
}) {

    const dispatch = useDispatch();

    const fileTree = useSelector(state => state.nav.fileTree)
    const openedTabs = useSelector(state => state.content.openedTabs)
    const openedTabsHash = useSelector(state => state.content.openedTabsHash)
    const currentContent = useSelector(state => state.content.currentContent)
    const isMobile = useSelector(state => state.app.isMobile)
    const currTab = useSelector(state => state.nav.currentTab)
    const contentContainer = document.querySelector("#content")
    const navBarTabContentRef = useRef(null)
    const pageContentRef = useRef(null)
    const navBar = navBarRef.current

    const clickOutside = (event) => {
        const navBarTabContent = navBarTabContentRef.current;
        if (
            isMobile &&
            navBarTabContent &&
            !navBarTabContent.contains(event.target) &&
            event.target !== navBarTabContent &&
            event.target !== navBar
        ) {
            dispatch(updateCurrentTab(null))
        }
    }

    useEffect(() => {
        const pageContent = pageContentRef.current;
        if (isMobile && pageContent) {
            pageContent.addEventListener('pointerdown', clickOutside)
        }

        return () => {
            if (pageContent) {
                pageContent.removeEventListener('pointerdown', clickOutside)
            }
        }
    }, [isMobile, clickOutside])

    const changePage = useCallback(debounce((e) => {
        if (e.ctrlKey || e.shiftKey) return;

        // User already at the top
        if (contentContainer.scrollTop < 1) {
            if (e.nativeEvent.wheelDeltaY >= 90) {

                // There's not enough content to cause scroll
                // User reached top
                if (!((contentContainer.scrollHeight - contentContainer.clientHeight) < 2) && !reachedTop) {
                    setReachedTop(true)
                    setReachedEnd(false)
                    return
                }
                if (openedTabs?.currentContent?.prev) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.prev));
                    contentContainer.scrollTo(0, 0)
                    return
                }
            } else if ((contentContainer.scrollHeight - contentContainer.clientHeight) < 2) {

                // User reached bottom as well since there's not enough content to cause scroll
                if (e.nativeEvent.wheelDeltaY <= -90) {
                    if (openedTabs?.currentContent?.next) {
                        dispatch(addOpenedTabs(openedTabs.currentContent.next));
                        contentContainer.scrollTo(0, 0)
                        return
                    }
                    else {
                        const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                        if (nextFile) {
                            dispatch(addOpenedTabs(new Node(nextFile)));
                            contentContainer.scrollTo(0, 0)
                            return
                        }
                    }
                }
            }
        }

        // There's content to be able to scroll and user has reached bottom
        if (Math.abs(contentContainer.scrollHeight - (contentContainer.scrollTop + contentContainer.clientHeight)) < 2) {
            if (!reachedEnd) {
                // User has reached bottom for the first time
                setReachedTop(false);
                setReachedEnd(true);
                return
            }
            if (e.nativeEvent.wheelDeltaY <= -90) {
                setReachedTop(true); // Moving to next file, so user has already reached top of the new file
                setReachedEnd(false);
                if (openedTabs?.currentContent?.next) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.next));
                    contentContainer.scrollTo(0, 0)
                    return
                }
                else {
                    const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                    if (nextFile) {
                        dispatch(addOpenedTabs(new Node(nextFile)));
                        contentContainer.scrollTo(0, 0)
                    }
                    return
                }
            }
        }
        setReachedEnd(false)
        setReachedTop(false)
    }, 200), [openedTabsHash, openedTabs, reachedEnd, reachedTop]);

    const handleOpenedTabClick = (tab) => {
        setReachedTop(true)
        setReachedEnd(false)
        contentContainer.scrollTo(0, 0)
        dispatch(addOpenedTabs(tab))
    }

    const handleCloseOpenedTab = (tab) => {
        setReachedEnd(false)
        setReachedTop(true)
        contentContainer.scrollTo(0, 0)
        dispatch(closeOpenedTab(tab))
    }


    useEffect(() => {
        if (!openedTabs.head) {
            for (let i = 0; i < fileTree[0].files.length; i++) {
                const newNode = new Node(fileTree[0].files[i])
                dispatch(addOpenedTabs(newNode))
            }
            const newNode = new Node(fileTree[0].files[0])
            dispatch(addOpenedTabs(newNode))
        }
    }, [])

    return (
        <div
            id="pageContent"
            ref={pageContentRef}
            className="content"
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
            onWheel={(e) => changePage(e)} // do for track pad scroll
        >
            <div className="content-header">
                <ContentNav
                    handleOpenedTabClick={handleOpenedTabClick}
                    handleCloseOpenedTab={handleCloseOpenedTab}
                />
            </div>
            {(isMobile && currTab) && <div
                id="navBarTabContent"
                className="mobile-navBar"
                ref={navBarTabContentRef}
            >
                <NavBarTabContent
                    setReachedTop={setReachedTop}
                    setReachedEnd={setReachedEnd}
                />
            </div>}
            <AnimatePresence>
                <motion.div
                    className="tabs"
                    id="content"
                    style={{
                        color: '#fff',
                        padding: '1rem',
                        overflow: 'auto',
                        paddingBottom: 0
                    }}
                >
                    {currentContent == 'profile' && <Profile key={'profile'} />}
                    {currentContent == 'education' && <Education key={'education'} />}
                    {currentContent == 'skillsAndProjects' && <SkillsAndProjects key={'skillsAndProjects'} />}
                    {currentContent == 'resume' && <Resume key={'interests'} />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}