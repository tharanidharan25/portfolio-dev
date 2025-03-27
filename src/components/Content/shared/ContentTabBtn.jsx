import { VscChromeClose } from "react-icons/vsc";
import { FaJsSquare } from "react-icons/fa";
import { ImFilePdf } from "react-icons/im";

import { motion } from 'motion/react';

export default function ContentTabBtn({
    label = "",
    onClick = () => {},
    onClose = () => {},
    currentTab = false,
    fileType = 'js',
    ...props
}) {
    return (
        <div 
            key={'label'}
            style={{
                position: 'relative',
            }}
        >
            {currentTab && (<motion.span
                layoutId="contentTab"
                transition={{ type:'spring', duration: 0.5, bounce: 0 }}
                style={{
                    background: '#000',
                    zIndex: 0,
                    inset: 0,
                    position: 'absolute',
                }}
            ></motion.span>)}
            <span
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRight: '2px solid black',
                    position: 'relative',
                }}
            >
                <div>
                    {fileType.toLowerCase() === 'js' ? <FaJsSquare 
                        color="rgb(255, 255, 0)"
                        size={14}
                    /> : <ImFilePdf 
                        color="#c1121f"
                        size={14}
                    />}
                </div>
                <button 
                    className="content-tab-btn"
                    onClick={onClick}
                    {...props}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px 4px',
                        fontSize: '14px',
                        color: '#fff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        ...props?.style,
                    }}
                >
                    <span>{label}</span>
                </button>
                <div
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        transition: '200ms ease-in-out'
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className="content-nav-close"
                >
                    <VscChromeClose 
                        size={14}
                        color="#fff"
                    />
                </div>
            </span>
        </div>
    )
}