import { useMemo, useRef, useState } from "react"
import { pdfjs, Document, Page } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import resumePDF from '../../assets/tharanidharan.pdf'
import { MdOutlineFileDownload, MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md"
import { CiZoomIn, CiZoomOut } from "react-icons/ci"
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

import DownloadBtn from "./DownloadBtn"

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

export default function Resume() {
    const [numPages, setNumPages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const pdfContainerRef = useRef(null)
    const [pdfScale, setPdfScale] = useState(1)

    const memoizedFile = useMemo(() => resumePDF, [])

    const LoadingSpinner = () => (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>📄 Fetching the resume...</p>
            <div className="loader" />
        </div>
    )

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: 'center'
        }}>
            {!isLoading &&
                <div className="pdf-btns-container">
                    <button
                        className="download-btn"
                        onClick={() => setPdfScale((prev) => Math.min(prev + 0.25, 3))}
                    >
                        <MdOutlineZoomIn
                            color="#fff"
                            size={'1.15rem'}
                        />
                    </button>
                    <button
                        className="download-btn"
                        onClick={() => setPdfScale((prev) => Math.max(prev - 0.25, 0.5))}
                    >
                        <MdOutlineZoomOut
                            color="#fff"
                            size={'1.15rem'}
                        />
                    </button>
                    <DownloadBtn
                        filePath="/assets/tharanidharan.pdf"
                        fileName={"tharanidharan.pdf"}
                    >
                        <MdOutlineFileDownload
                            color="#fff"
                            size={'1.15rem'}
                        />
                    </DownloadBtn>
                </div>
            }
            <div
                ref={pdfContainerRef}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    overflow: "auto",
                    width: "100%",
                }}
                id="resumeContainer"
            >
                <div style={{
                    position: "relative",
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Document
                        file={memoizedFile}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        onLoadError={(error) => console.error("PDF loading error:", error)}
                        loading={<LoadingSpinner />}
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                scale={pdfScale}
                                renderAnnotationLayer
                                onRenderSuccess={() => {
                                    if (pdfContainerRef.current) {
                                        setIsLoading(false)
                                        const links = pdfContainerRef.current.querySelectorAll("a")
                                        links.forEach((link) => {
                                            link.setAttribute("target", "_blank")
                                            link.setAttribute("rel", "noopener noreferrer")
                                        })
                                    }
                                }}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    )
}
