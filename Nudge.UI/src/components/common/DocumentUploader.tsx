"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Eye,
  AlertCircle,
  X,
  FileText,
} from "lucide-react";

interface DocumentUploaderProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  value?: string | null;
  onChange: (url: string) => void;
  required?: boolean;
  maxSizeMB?: number;
}

export function DocumentUploader({
  label,
  description,
  icon,
  value,
  onChange,
  required = false,
  maxSizeMB = 5,
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // 1. File Size Guard
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorMessage(`File exceeds ${maxSizeMB} MB limit.`);
      return;
    }

    // 2. Allowed Formats
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Only JPG, PNG, WEBP, or PDF files are accepted.");
      return;
    }

    setUploading(true);

    try {
      // In production, invoke your presigned S3 / Cloudflare R2 / Server upload endpoint:
      // const formData = new FormData();
      // formData.append("file", file);
      // const res = await axios.post("/api/storage/upload", formData);
      // onChange(res.data.url);

      // Local preview simulation for now:
      const localUrl = URL.createObjectURL(file);
      onChange(localUrl);
    } catch {
      setErrorMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div className="p-4 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary transition-colors bg-surface-container-low/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-label-md text-xs md:text-sm font-bold text-on-surface flex items-center gap-1.5">
              {icon}
              {label} {required && <span className="text-error">*</span>}
            </span>
          </div>
          <p className="font-body-sm text-[11px] md:text-xs text-on-surface-variant mb-3">
            {description}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-2 p-2 rounded-lg bg-error-container/40 text-error flex items-center gap-1.5 text-[11px]">
            <AlertCircle size={13} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {value ? (
          /* Preview State */
          <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/60">
            {value.includes(".pdf") ? (
              <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <FileText size={22} />
              </div>
            ) : (
              <img
                src={value}
                alt="Document Preview"
                className="w-12 h-12 rounded-lg object-cover border border-outline-variant/80 shrink-0"
              />
            )}

            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-xs font-semibold text-on-surface truncate">Document attached</div>
              <div className="text-[10px] text-tertiary flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={12} />
                <span>Verified • Ready</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <RefreshCw size={11} /> Re-upload
                </button>
                <span className="text-outline-variant">|</span>
                <button
                  type="button"
                  onClick={() => setIsViewerOpen(true)}
                  className="text-tertiary hover:underline font-semibold flex items-center gap-1"
                >
                  <Eye size={11} /> View
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Dropzone State */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`bg-surface-container-lowest p-4 rounded-lg border border-dashed text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
              isDragging
                ? "border-primary bg-primary-fixed/20"
                : "border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            <UploadCloud size={24} className="text-primary mb-1" />
            <span className="text-xs font-semibold text-on-surface">
              {uploading ? "Uploading..." : "Click or drop document here"}
            </span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">
              JPG, PNG, PDF (Max {maxSizeMB} MB)
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              processFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* Lightbox / Preview Modal */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative max-w-2xl w-full bg-surface-container-lowest p-4 rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-3">
              <span className="text-xs font-bold text-on-surface">{label} Document Preview</span>
              <button
                type="button"
                onClick={() => setIsViewerOpen(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            {value?.includes(".pdf") ? (
              <iframe src={value} className="w-full h-96 rounded-xl border border-outline-variant" title={label} />
            ) : (
              <img
                src={value || ""}
                alt={label}
                className="max-h-[75vh] w-auto object-contain rounded-xl border border-outline-variant shadow-inner"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}