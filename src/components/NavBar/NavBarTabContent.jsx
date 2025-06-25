import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'motion/react';
import PropTypes from "prop-types";

import ReusableIconBtn from "../../utils/ReusableIconBtn";
import ReusableNavBtn from "../../utils/ReusableNavBtn";

import { Node } from "../Content/Content";
import { updateCurrentTab, updateFileTree } from "../../redux/slices/navSlice";
import { addOpenedTabs, setReachedEnd, setReachedTop } from "../../redux/slices/contentSlice";

import {
    VscChevronRight,
    VscChevronDown,
    VscClose
} from "react-icons/vsc";
import { FaJsSquare } from "react-icons/fa";
import { ImFilePdf } from "react-icons/im";

export default function NavBarTabContent({
    className = ''
}) {

    const dispatch = useDispatch()
    const fileTree = useSelector(state => state.nav.fileTree)
    const currTab = useSelector(state => state.nav.currentTab)
    const isMobile = useSelector(state => state.app.isMobile)

    const contentContainer = document.querySelector("#content")
    const navBarTabContent = document.getElementById("navBarTabContent")

    const getContent = () => {
        if (currTab == 'files') {
            return (
                <div className="explorer-container">
                    <div className="nav-bar-tab-content-title-container">
                        <p
                            className="nav-bar-tab-content-title"
                        >
                            Explorer
                        </p>
                        {
                            isMobile && <ReusableIconBtn
                                onClick={() => {
                                    dispatch(updateCurrentTab(null))
                                    navBarTabContent.close()
                                }}
                            >
                                <VscClose
                                    size={16}
                                    color="#fff"
                                />
                            </ReusableIconBtn>
                        }
                    </div>
                    {fileTree.map((eachTree, idx) => (
                        <motion.div
                            key={eachTree.key}
                            initial={{ y: 1 }}
                            animate={{ y: 0 }}
                            exit={{ y: -1 }}
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
                                                ...(eachTree.isExpanded && { transform: 'rotate(-90deg)' }),
                                                ...(!eachTree.isExpanded && { transform: 'rotate(90deg)' })
                                            }}
                                            animate={{ transform: 'rotate(0deg)' }}
                                            exit={{
                                                ...(eachTree.isExpanded && { transform: 'rotate(-90deg)' }),
                                                ...(!eachTree.isExpanded && { transform: 'rotate(90deg)' })
                                            }}
                                            transition={{
                                                type: "spring",
                                                duration: 0.2,
                                                bounce: 0,
                                            }}
                                        >
                                            {eachTree.isExpanded ? (<VscChevronDown
                                                key={'expanded'}
                                                color="white"
                                                size={14}
                                            />) : (<VscChevronRight
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
                                    {eachTree.isExpanded && eachTree.files.map((eachFile, idx) => (
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
                                                onClick={() => {
                                                    dispatch(setReachedTop(true))
                                                    dispatch(setReachedEnd(false))
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
                    ))}
                </div>
            )
        }
    }

    return (
        <section
            className={`tab-content ${className}`}
            style={{
                height: '100%'
            }}
        >
            {getContent()}
        </section>
    )
}

NavBarTabContent.propTypes = {
    className: PropTypes.string,
}