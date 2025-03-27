import { useDispatch, useSelector } from "react-redux"

import ContentTabBtn from "./shared/ContentTabBtn";

import { addOpenedTabs, closeOpenedTab } from "../../redux/slices/contentSlice";
import { AnimatePresence, motion } from 'motion/react';

export default function ContentNav({ 
    handleOpenedTabClick,
    handleCloseOpenedTab
}) {
    const tabs = useSelector(state => state.content.tabs) || [];
    const openedTabs = useSelector(state => state.content.openedTabs);

    const getopenedTabs = () => (
        tabs.map((eachTab, idx) => (
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