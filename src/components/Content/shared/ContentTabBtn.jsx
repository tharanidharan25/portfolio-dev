import { VscChromeClose } from "react-icons/vsc";
import { FaJsSquare } from "react-icons/fa";

export default function ContentTabBtn({
    label = "",
    onClick = () => {},
    onClose = () => {},
    currentTab = false,
    ...props
}) {
    return (
        <div
            style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                borderRight: '2px solid black',
                background: '#2c2b2b',
                ...(currentTab && {background: '#000'})
            }}
        >
            <div><FaJsSquare 
                color="rgb(255, 255, 0)"
                size={14}
            /></div>
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
                    ...props?.style,
                }}
            >
                {label}
            </button>
            <div
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={onClose}
            >
                <VscChromeClose 
                    size={14}
                    color="#fff"
                />
            </div>
        </div>
    )
}