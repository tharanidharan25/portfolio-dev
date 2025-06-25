import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

import Profile from "../Profile";
import SkillsAndProjects from "../SkillsAndProjects/SkillsAndProjects";

import { addOpenedTabs, closeOpenedTab, setReachedEnd, setReachedTop } from "../../redux/slices/contentSlice";
import ContentNav from "./ContentNav";
import Resume from "../Resume/Resume";
import NavBarTabContent from "../NavBar/NavBarTabContent";
import { updateCurrentTab } from "../../redux/slices/navSlice";
import PropTypes from "prop-types";

export class Node {
    constructor(element) {
        this.data = element;
        this.next = null;
        this.prev = null;
    }
}

const ScrollableContent = ({ content }) => {
    const dispatch = useDispatch()

    const fileTree = useSelector(state => state.nav.fileTree)
    const openedTabs = useSelector(state => state.content.openedTabs)
    const openedTabsHash = useSelector(state => state.content.openedTabsHash)
    const reachedTop = useSelector(state => state.content.reachedTop)
    const reachedEnd = useSelector(state => state.content.reachedEnd)
    const currentContent = useSelector(state => state.content.currentContent)

    const contentRef = useRef(null)


    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo(0, 0)
            dispatch(setReachedTop(true))
            dispatch(setReachedEnd(false))
        }
    }, [currentContent, dispatch])

    const scrollPage = useCallback(debounce((e) => {
        const target = e.target;

        const isAtTop = target.scrollTop < 1;
        const isAtBottom = Math.abs(target.scrollHeight - (target.scrollTop + target.clientHeight)) < 2;

        // User has reached the top for the first time
        if (isAtTop) {
            if (!reachedTop) {
                dispatch(setReachedTop(true));
                dispatch(setReachedEnd(false));
            }
        } else if (isAtBottom) {
            if (!reachedEnd) {
                // User has reached the bottom for the first time
                dispatch(setReachedTop(false));
                dispatch(setReachedEnd(true));
            }
        } else if (!isAtTop && !isAtBottom) {
            if (reachedTop || reachedEnd){
                dispatch(setReachedTop(false));
                dispatch(setReachedEnd(false));
            }
        }
    }, 200), [dispatch, reachedEnd, reachedTop])

    const changePage = debounce((e) => {
        if (e.ctrlKey || e.shiftKey) return;
        if (e.nativeEvent.wheelDeltaY <= -90 && reachedEnd) {
            // User has reached bottom of the current file
            // Scrolling down
            if (openedTabs?.currentContent?.next) {
                dispatch(addOpenedTabs(openedTabs.currentContent.next));
            } else {
                const nextFile = fileTree[0].files.find(eachFile => !(eachFile.id in openedTabsHash))
                if (nextFile) {
                    dispatch(addOpenedTabs(new Node(nextFile)));
                }
            }
        } else if (e.nativeEvent.wheelDeltaY >= 90 && reachedTop) {
            // User has reached top of the current file
            // Scrolling up
            if (openedTabs?.currentContent?.prev) {
                dispatch(addOpenedTabs(openedTabs.currentContent.prev));
            }
        }
    }, 200)

    useEffect(() => {
        return () => {
            scrollPage.cancel()
            changePage.cancel()
        }
    }, [scrollPage, changePage])

    return (
        <div
            className="tabs"
            id="content"
            style={{
                color: '#fff',
                padding: '1rem',
                overflow: 'auto',
                paddingBottom: 0
            }}
            onScroll={scrollPage}
            onWheel={changePage}
            ref={contentRef}
        >
            {content}
        </div>
    )
}

ScrollableContent.propTypes = {
    content: PropTypes.element
}

export default function Content({
    navBarRef
}) {

    const dispatch = useDispatch();

    const fileTree = useSelector(state => state.nav.fileTree)
    const openedTabs = useSelector(state => state.content.openedTabs)
    const currentContent = useSelector(state => state.content.currentContent)
    const isMobile = useSelector(state => state.app.isMobile)
    const currTab = useSelector(state => state.nav.currentTab)
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

    const handleOpenedTabClick = (tab) => {
        dispatch(addOpenedTabs(tab))
    }

    const handleCloseOpenedTab = (tab) => {
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

    const content = <>
        {currentContent == 'profile' && <Profile key={'profile'} />}
        {currentContent == 'skillsAndProjects' && <SkillsAndProjects key={'skillsAndProjects'} />}
        {currentContent == 'resume' && <Resume key={'resume'} />}
    </>

    return (
        <div
            id="pageContent"
            ref={pageContentRef}
            className="content"
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="content-header">
                <ContentNav
                    handleOpenedTabClick={handleOpenedTabClick}
                    handleCloseOpenedTab={handleCloseOpenedTab}
                />
            </div>
            {
                (isMobile && currTab) && <div
                    id="navBarTabContent"
                    className="mobile-navBar"
                    ref={navBarTabContentRef}
                >
                    <NavBarTabContent />
                </div>
            }
            <ScrollableContent content={content} />
        </div>
    )
}

Content.propTypes = {
    navBarRef: PropTypes.element
}