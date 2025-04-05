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