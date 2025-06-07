import React from "react";
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from 'motion/react'
import PropTypes from "prop-types";

import ContentTabBtn from "./shared/ContentTabBtn";


export default function ContentNav({
    handleOpenedTabClick,
    handleCloseOpenedTab
}) {
    const tabs = useSelector(state => state.content.tabs) || [];
    const openedTabs = useSelector(state => state.content.openedTabs);

    const getopenedTabs = () => (
        tabs.map((eachTab) => (
            <ContentTabBtn
                key={eachTab.data.id}
                onClick={() => handleOpenedTabClick(eachTab)}
                onClose={() => handleCloseOpenedTab(eachTab)}
                label={eachTab.data.label}
                currentTab={openedTabs.currentContent?.data?.id === eachTab.data.id || false}
                fileType={eachTab.data.fileType}
            />

        ))
    )

    return (
        <AnimatePresence initial={false}>
            <motion.div
                style={{
                    display: 'flex',
                    background: '#2d2f2d',
                    overflow: 'auto'
                }}
                id="contentNav"
            >
                {getopenedTabs()}
            </motion.div>
        </AnimatePresence>
    )
}

ContentNav.propTypes = {
    handleOpenedTabClick:  PropTypes.func,
    handleCloseOpenedTab: PropTypes.func
}