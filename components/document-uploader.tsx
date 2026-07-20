"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentUploaderProps {
  onUploadComplete: (fileName: string) => void;
}

export function DocumentUploader({ onUploadComplete }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        onUploadComplete(file.name);
      }, 2000);
    },
    [onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Upload Document</h2>
        <p className="mt-1 text-muted-foreground">
          Select a medical or legal document to analyze
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!isUploading ? handleClick : undefined}
        className={cn(
          "flex flex-1 cursor-pointer flex-col items-center justify-center border-2 border-dashed p-8 transition-colors sm:p-12",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/50 hover:bg-muted/30",
          isUploading && "pointer-events-none cursor-default"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={handleInputChange}
        />

        {isUploading ? (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border border-border bg-muted">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium">Uploading document...</p>
            {selectedFile && (
              <p className="font-mono text-sm text-muted-foreground">
                {selectedFile.name}
              </p>
            )}
            <div className="h-3 w-full overflow-hidden border border-border bg-muted">
              <div
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {uploadProgress}%
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-muted">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <p className="mb-2 text-center text-xl font-medium">
              Drag your document here (PDF, JPG) or tap to browse
            </p>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Supported formats: PDF, JPG, PNG, WebP
            </p>
            <Button variant="outline" size="lg" type="button" className="min-h-12">
              Browse Files
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
