import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';

import { 
    VscFiles,
    VscSearch,
    VscSourceControl,
    VscChevronRight,
    VscChevronDown
} from "react-icons/vsc";
import { FaJsSquare } from "react-icons/fa";
import { ImFilePdf } from "react-icons/im";

import ReusableNavBtn from "../utils/ReusableNavBtn";

import { updateCurrentTab, updateFileTree } from "../redux/slices/navSlice"; 
import ReusableIconBtn from "../utils/ReusableIconBtn";
import { addOpenedTabs } from "../redux/slices/contentSlice";
import { Node } from "./Content/Content";

const tabs = [
    {
        name: 'files',
        icon: <VscFiles className="navbar-icons" />
    }, 
    {
        name:'search',
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
    const fileTree = useSelector(state => state.nav.fileTree);
    
    const contentContainer = document.querySelector("#content");

    const handleTabClick = (newValue) => {
        if (newValue === currTab) {
            dispatch(updateCurrentTab(null))
            return
        }
        dispatch(updateCurrentTab(newValue))
    }
    
    const getTabs = () => {
        return (
            tabs.map( eachTab => (
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
                                    type:"spring", 
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

    const getTabContent = () => {
        if ( currTab === "files" ) {
            return (
                fileTree.map((eachTree, idx) => (
                    <motion.div
                        key={eachTree.key}
                        initial={{ y: 2 }}
                        animate={{ y: 0 }}
                        exit={{ y: -2 }}
                        transition={{ 
                            type: "spring",
                            duration: 0.2, 
                            bounce: 0 
                        }}
                    >
                            <ReusableIconBtn
                                onClick={() => dispatch(updateFileTree({
                                    idx,
                                    field: 'isExpanded',
                                    value: !eachTree.isExpanded
                                }))}
                            >
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <motion.div
                                            key={eachTree.isExpanded ? 'expanded' : 'retracted'}
                                            initial={{ 
                                                ...( eachTree.isExpanded && { transform: 'rotate(-90deg)' }),
                                                ...( !eachTree.isExpanded && { transform: 'rotate(90deg)' }) 
                                            }}
                                            animate={{ transform: 'rotate(0deg)' }}
                                            exit={{ 
                                                ...( eachTree.isExpanded && { transform: 'rotate(-90deg)' }),
                                                ...( !eachTree.isExpanded && { transform: 'rotate(90deg)' })
                                            }}
                                            transition={{ 
                                                type: "spring",
                                                duration: 0.2, 
                                                bounce: 0,
                                            }}
                                        >
                                            {eachTree.isExpanded ? ( <VscChevronDown 
                                                key={'expanded'}
                                                color="white"
                                                size={14}
                                            />) : ( <VscChevronRight
                                                key={'retracted'}
                                                color="white"
                                                size={14}
                                            />)}
                                        </motion.div>
                                        <p
                                            style={{ 
                                                color: 'white',
                                                fontSize: '14px'
                                            }}
                                            >
                                            {eachTree.name}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </ReusableIconBtn>
                            <div
                                key={`${eachTree.key}-files-container`}
                                style={{
                                        borderLeft: '1px solid white',
                                        marginLeft: '0.42rem',
                                }}
                            >
                                <AnimatePresence initial={false}>
                                    {eachTree.isExpanded && eachTree.files.map( (eachFile, idx) => (
                                        <motion.div
                                            key={eachFile.id}
                                            initial={{ y: -5 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: -5 }}
                                            transition={{
                                                type: "spring",
                                                duration: 0.025, 
                                                bounce: 0,
                                            }}
                                        >
                                            <ReusableNavBtn
                                                className={idx}
                                                onClick={(e) => {
                                                    setReachedTop(true)
                                                    setReachedEnd(false)
                                                    contentContainer.scrollTo(0, 0)
                                                    const newNode = new Node(eachFile)
                                                    dispatch(addOpenedTabs(newNode))
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {eachFile.fileType.toLowerCase() === 'js' ? <FaJsSquare  
                                                        color="rgb(255, 255, 0)"
                                                        size={14}
                                                    /> : <ImFilePdf 
                                                        color="#c1121f"
                                                        size={14}
                                                    />}
                                                    <p
                                                        style={{
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            overflow: 'hidden'
                                                        }}
                                                    >{eachFile.label}</p>
                                                </div>
                                            </ReusableNavBtn>
                                        </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                    </motion.div>
                ))
            )
        }
    }


    return (
        <div className="navbar">
            <div className="tabs-container">
                {getTabs()}
            </div>
            {
                currTab &&
                <AnimatePresence mode="popLayout" initial={false}>
                    <div 
                        className="tab-content"
                    >
                        {getTabContent()}
                    </div>
                </AnimatePresence>
            }
        </div>
    )
}