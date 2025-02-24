import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { debounce } from "lodash";

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

    console.log(openedTabsHash);

    const changePage = useCallback(debounce((e) => {
        const contenNav = document.querySelector("#content");

        if (Math.abs(contenNav.scrollHeight - contenNav.scrollTop - contenNav.clientHeight) < 1) {
            if (e.nativeEvent.wheelDeltaY <= -120) {
                if (openedTabs?.currentContent?.next) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.next));
                } 
                // else {
                //     const nextFile = fileTree[0].files.find(eachFile => !(eachFile.id in openedTabsHash))
                //     if (nextFile) {
                //         dispatch(addOpenedTabs(new Node(nextFile)));
                //     }
                // }
            } else if (e.nativeEvent.wheelDeltaY >= 120) {
                if (openedTabs?.currentContent?.prev) {
                    dispatch(addOpenedTabs(openedTabs.currentContent.prev));
                }
            }
        }
    }, 100),[openedTabs, dispatch]);


    useEffect(() => {
        if (!openedTabs.head){
            const newNode = new Node(fileTree[0].files[0])
            dispatch(addOpenedTabs(newNode))
        }
    }, [])

    return (
        <main 
            className="content"
            id="content"
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            onWheel={(e) => changePage(e)}
        >
            <div className="content-header">
                <ContentNav />
            </div>
            <div 
                className="tabs"
                style={{
                    color: '#fff'
                }}
            >
                {currentContent == 'profile' && <Profile />}
                {currentContent == 'education' && <Education />}
                {currentContent == 'projects' && <Projects />}
                {currentContent == 'skills' && <Skills />}
                {currentContent == 'interests' && <Interests />}
            </div>
        </main>
    )
}