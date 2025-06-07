import React from "react"
import PropTypes from "prop-types"

export default function DownloadBtn({
    filePath = '',
    fileName = 'file',
    children
}) {
    return (
        <a 
            href={filePath}
            download={fileName}
            className="download-btn"
        >
            {children}
        </a>
    )
}

DownloadBtn.propTypes = {
    filePath: PropTypes.string,
    fileName: PropTypes.string,
    children: PropTypes.node
}