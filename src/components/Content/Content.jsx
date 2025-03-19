import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { debounce, throttle } from "lodash";
import { AnimatePresence, motion } from 'motion/react';

import Profile from "../Profile";
import Education from "../Education";
import SkillsAndProjects from "../SkillsAndProjects/SkillsAndProjects";
import Interests from "../Interests";

import { addOpenedTabs } from "../../redux/slices/contentSlice";
import ContentNav from "./ContentNav";

export class Node {
    constructor(element) {
        this.data = element;
        this.next = null;
        this.prev = null;
    }
}

export default function Content() {

    const dispatch = useDispatch();

    const fileTree = useSelector(state => state.nav.fileTree);
    const openedTabs = useSelector(state => state.content.openedTabs);
    const openedTabsHash = useSelector(state => state.content.openedTabsHash);
    const currentContent = useSelector(state => state.content.currentContent);

    const [reachedEnd, setReachedEnd] = useState(false);
    const [reachedTop, setReachedTop] = useState(true);

    const contentNav = document.querySelector("#content");

    const changePage = useCallback(debounce((e) => {
        if (e.ctrlKey || e.shiftKey) return;

        // User already at the top
        if (contentNav.scrollTop < 1) {
            if (e.nativeEvent.wheelDeltaY >= 120) {

                // There's not enough content to cause scroll
                // User reached top
                if (!((contentNav.scrollHeight - contentNav.clientHeight) < 1) && !reachedTop) {
                    setReachedTop(true)
                    setReachedEnd(false)
                    return
                }
                if (openedTabs?.currentContent?.prev) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.prev));
                    contentNav.scrollTo(0, 0)
                    return
                }
            } else if ((contentNav.scrollHeight - contentNav.clientHeight) < 1) {
                
                // User reached bottom as well since there's not enough content to cause scroll
                if (e.nativeEvent.wheelDeltaY <= -120) {
                    if (openedTabs?.currentContent?.next) {
                        dispatch(addOpenedTabs(openedTabs.currentContent.next));
                        contentNav.scrollTo(0, 0)
                        return
                    } 
                    else {
                        const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                        if (nextFile) {
                            dispatch(addOpenedTabs(new Node(nextFile)));
                            contentNav.scrollTo(0, 0)
                            return
                        }
                    }
                }
            }
        }

        // There's content to be able to scroll and user has reached bottom
        if (Math.abs(contentNav.scrollHeight - (contentNav.scrollTop + contentNav.clientHeight)) < 1) {
            if (!reachedEnd) {
                // User has reached bottom for the first time
                setReachedTop(false);
                setReachedEnd(true);
                return
            }
            setReachedTop(true); // Moving to next file, so user has already reached top of the new file
            setReachedEnd(false);
            if (e.nativeEvent.wheelDeltaY <= -120) {
                if (openedTabs?.currentContent?.next) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.next));
                    contentNav.scrollTo(0, 0)
                    return
                } 
                else {
                    const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                    if (nextFile) {
                        dispatch(addOpenedTabs(new Node(nextFile)));
                        contentNav.scrollTo(0, 0)
                        return
                    }
                }
            }
        }
        setReachedEnd(false)
        setReachedTop(false)
    }, 200),[openedTabsHash, openedTabs, reachedEnd, reachedTop]);

    // contentNav.onscroll = (e) => {
    //     console.log(e);
    // }


    useEffect(() => {
        if (!openedTabs.head){
            for (let i = 0; i < fileTree[0].files.length; i++) {
                const newNode = new Node(fileTree[0].files[i])
                dispatch(addOpenedTabs(newNode))
            }
            const newNode = new Node(fileTree[0].files[0])
            dispatch(addOpenedTabs(newNode))
        }
    }, [])

    return (
        <main 
            className="content"
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
            onWheel={(e) => changePage(e)} // do for track pad scroll
        >
            <div className="content-header">
                <ContentNav />
            </div>
            <AnimatePresence>
                <motion.div 
                    className="tabs"
                    id="content"
                    style={{
                        color: '#fff',
                        padding: '1rem',
                        overflow: 'auto',
                    }}
                >
                    {currentContent == 'profile' && <Profile key={'profile'}/>}
                    {currentContent == 'education' && <Education key={'education'}/>}
                    {currentContent == 'skillsAndProjects' && <SkillsAndProjects key={'skillsAndProjects'}/>}
                    {currentContent == 'interests' && <Interests key={'interests'}/>}
                </motion.div>
            </AnimatePresence>
        </main>
    )
}