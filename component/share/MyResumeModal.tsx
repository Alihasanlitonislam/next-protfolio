"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";


import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Loading from "./Loading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface MyResumeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl?: string;
  title?: string;
}

export default function MyResumeModal({
  isOpen,
  onOpenChange,
  pdfUrl = "/Resume-Front-End-by-Ali-Hasan.pdf",
  title = "Resume",
}: MyResumeModalProps) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(isOpen);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>();


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(1);
      setMounted(true);
      return;
    }

    document.body.style.overflow = "";
    const timeout = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(timeout);
  }, [isOpen]);


useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver(([entry]) => {
    setPageWidth(entry.contentRect.width);
  });

  observer.observe(containerRef.current);

  return () => observer.disconnect();
}, []);


  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-1000 flex items-center justify-center px-4"
    >
      <button
        aria-label="Close modal"
        onClick={() => onOpenChange(false)}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative w-full max-w-5xl min-h-[90vh] max-h-[95vh]
        bg-(--bg-primary) rounded-2xl shadow-2xl flex flex-col overflow-hidden
        transition-all duration-300 ease-out motion-reduce:transition-none
        ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-6"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-(--border-secondary)">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="p-2 rounded-md border border-(--border-secondary)
              bg-(--bg-tertiary)/20 hover:bg-(--bg-tertiary)
              transition-colors  cursor-pointer"
            >
              <Download className="w-5 h-5" />
            </a>

            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-md border border-(--border-secondary)
              bg-(--bg-tertiary)/20 hover:bg-(--bg-tertiary)
              transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>
          
       
        <div className="flex-1 overflow-auto scrollbar-hidden flex justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<div className="w-full h-[80vh] flex items-center justify-between"><Loading/></div>}
            error={<div className="py-12 text-red-500">Failed to load PDF</div>}
          >
            <div
              ref={containerRef}
              className="w-full max-w-3xl px-2 sm:px-6 mx-auto"
            >
              <Page
                pageNumber={page}
                width={pageWidth}
                renderAnnotationLayer
                renderTextLayer
                className="rounded-lg shadow"
              />
            </div>
          </Document>
        </div>


        <footer className="flex items-center justify-between px-6 py-4 border-t border-(--border-secondary)">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border
            border-(--border-secondary) hover:bg-(--bg-tertiary)
            disabled:opacity-40 transition-colors  cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-sm">
            Page {page} of {numPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page === numPages}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border
            border-(--border-secondary) hover:bg-(--bg-tertiary)
            disabled:opacity-40 transition-colors  cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
}
