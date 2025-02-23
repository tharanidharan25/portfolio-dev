import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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
    const currentContent = useSelector(state => state.content.currentContent);


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
                flexDirection: 'column'
            }}
            onWheel={(e) => {
                console.log(e)
                const contenNav = document.querySelector('.content')
                console.log(Math.abs(contenNav.scrollHeight - contenNav.scrollTop - contenNav.clientHeight))
            }}
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