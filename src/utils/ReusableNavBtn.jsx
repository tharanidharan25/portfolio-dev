import React from "react"
import PropTypes from "prop-types"

export default function ReusableNavBtn({
    children,
    className,
    ...props
}) {

    return (
        <button
            className={`nav-btn-${className}`}
            style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                padding: '0.25rem 1rem',
                cursor: 'pointer',
                textAlign: 'left',
            }}
            {...props}
        >
            {children}
        </button>
    )
}

ReusableNavBtn.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}