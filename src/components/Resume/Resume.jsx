import { useEffect, useMemo, useRef, useState } from "react"
import { pdfjs, Document, Page } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import { MdOutlineFileDownload } from "react-icons/md";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

import DownloadBtn from "./DownloadBtn";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

export default function Resume() {
    const [numPages, setNumPages] = useState(null)
    const pdfContainerRef = useRef(null)

    const ResumePDF = () => {
        return (
            <Document
                file="/assets/tharanidharan.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(error) => console.error("PDF loading error:", error)}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page 
                        key={`page_${index + 1}`} 
                        pageNumber={index + 1} 
                        scale={1.25} 
                        renderAnnotationLayer
                        onRenderSuccess={() => {
                            if (pdfContainerRef.current) {
                                const links = document.querySelectorAll('a')
                                links.forEach((link) => {
                                    link.setAttribute("target", "_blank");
                                    link.setAttribute("rel", "noopener noreferrer");
                                });
                            }
                        }}
                    />
                ))}
            </Document>
        )
    }


    return (
        <>
            {useMemo(() => (
                <div 
                    ref={pdfContainerRef}
                    style={{ 
                        display: "flex", 
                        justifyContent: "center",
                    }}
                    id="resumeContainer"
                >
                    <div
                        style={{
                            position: 'relative',
                            width: 'fit-content'
                        }}
                    >
                        <div
                            style={{ 
                                position: 'absolute',
                                zIndex: 9999,
                                right: 0
                            }}
                        >
                            <DownloadBtn
                                filePath="/assets/tharanidharan.pdf" 
                                fileName={'tharanidharan.pdf'}
                            >
                                <MdOutlineFileDownload color="#fff" />
                            </DownloadBtn>
                        </div>
                        <ResumePDF />
                    </div>
                </div>
            ), [])}
        </>
    )
}