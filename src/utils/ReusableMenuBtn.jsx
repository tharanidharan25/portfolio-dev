import React from "react"
import PropTypes from "prop-types"

export default function ReusableMenuBtn({
    onClick,
    children,
    ...props
}) {
    return (
        <div className="menu-btn-container">
            <button 
                className="menu-btn"
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        </div>
    )
}

ReusableMenuBtn.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
}