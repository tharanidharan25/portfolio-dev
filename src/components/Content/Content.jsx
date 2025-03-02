import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { debounce, throttle } from "lodash";
import { AnimatePresence, motion } from 'motion/react';

import Profile from "../Profile";
import Education from "../Education";
import Projects from "../Projects";
import Skills from "../Skills";
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

    const changePage = useCallback(debounce((e) => {
        if (e.ctrlKey) return;

        const contentNav = document.querySelector("#content");

        if (contentNav.scrollTop < 1) {
            if (e.nativeEvent.wheelDeltaY >= 120) {
                if (!((contentNav.scrollHeight - contentNav.clientHeight) < 1) && !reachedTop) {
                    setReachedTop(true)
                    return
                }
                if (openedTabs?.currentContent?.prev) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.prev));
                    return
                }
            } else if ((contentNav.scrollHeight - contentNav.clientHeight) < 1) {
                if (e.nativeEvent.wheelDeltaY <= -120) {
                    if (openedTabs?.currentContent?.next) {
                        dispatch(addOpenedTabs(openedTabs.currentContent.next));
                        return
                    } 
                    else {
                        const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                        if (nextFile) {
                            dispatch(addOpenedTabs(new Node(nextFile)));
                            return
                        }
                    }
                }
            }
        }
        if (Math.abs(contentNav.scrollHeight - (contentNav.scrollTop + contentNav.clientHeight)) < 1) {
            if (!reachedEnd) {
                setReachedTop(false);
                setReachedEnd(true);
                return
            }
            setReachedTop(true);
            setReachedEnd(false);
            if (e.nativeEvent.wheelDeltaY <= -120) {
                if (openedTabs?.currentContent?.next) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.next));
                    return
                } 
                else {
                    const nextFile = fileTree[0].files.find(eachFile => !(openedTabsHash.hasOwnProperty(eachFile.id)))
                    if (nextFile) {
                        dispatch(addOpenedTabs(new Node(nextFile)));
                        return
                    }
                }
            }
        }
        setReachedEnd(false)
        setReachedTop(false)
    }, 200),[openedTabsHash, openedTabs, reachedEnd, reachedTop]);


    useEffect(() => {
        if (!openedTabs.head){
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
            onWheel={(e) => changePage(e)}
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
                        paddingBottom: '3rem',
                        overflow: 'auto',
                    }}
                >
                    {currentContent == 'profile' && <Profile key={'profile'}/>}
                    {currentContent == 'education' && <Education key={'education'}/>}
                    {currentContent == 'projects' && <Projects key={'projects'}/>}
                    {currentContent == 'skills' && <Skills key={'skills'}/>}
                    {currentContent == 'interests' && <Interests key={'interests'}/>}
                </motion.div>
            </AnimatePresence>
        </main>
    )
}