import React from "react"
import PropTypes from "prop-types"

export default function ReusableIconBtn({
    children,
    sx,
    onClick,
    ...props
}) {
    return (
        <button
            style={{
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                ...sx
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

ReusableIconBtn.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
    onClick: PropTypes.func
}