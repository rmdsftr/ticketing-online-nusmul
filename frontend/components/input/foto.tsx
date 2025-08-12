import { InputHTMLAttributes, ReactNode, useState, useRef, DragEvent } from "react";
import clsx from "clsx";
import styles from "@/styles/components/foto.module.css";
import { poppins } from "@/components/fonts/poppins";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: string;
  variant?: "outline" | "solid" | "ghost";
  color?: "primary" | "danger" | "gray";
  className?: string;
  onFileSelect?: (files: FileList | null) => void;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  dragDropText?: string;
  browseText?: string;
  showPreview?: boolean;
}

export function FileUpload({
  label,
  iconLeft,
  iconRight,
  error,
  variant = "outline",
  color = "primary",
  className,
  onFileSelect,
  maxSize = 10,
  allowedTypes = ['image/*'],
  dragDropText = "Drag & drop files here, or click to browse",
  browseText = "Browse Files",
  showPreview = true,
  ...props
}: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileSelection(files);
  };

  const handleFileSelection = (files: FileList | null) => {
    if (files && files.length > 0) {
      // Ambil hanya file pertama untuk single file upload
      const file = files[0];
      
      // Validate file size and type
      const sizeValid = file.size <= maxSize * 1024 * 1024;
      const typeValid = allowedTypes.some(type => 
        type === '*/*' || 
        file.type.match(type.replace('*', '.*'))
      );

      if (sizeValid && typeValid) {
        const fileList = new DataTransfer();
        fileList.items.add(file);
        setSelectedFiles(fileList.files);
        onFileSelect?.(fileList.files);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFiles(null);
    onFileSelect?.(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={clsx(`${poppins.variable} ${styles.wrapper}`, className)}>
      {label && <label className={styles.label}>{label}</label>}

      {/* Upload Container - hanya muncul jika belum ada file terpilih */}
      {(!selectedFiles || selectedFiles.length === 0) && (
        <div
          className={clsx(
            styles.uploadContainer,
            styles[variant],
            styles[color],
            error && styles.error,
            isDragOver && styles.dragOver
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
          
          <div className={styles.uploadContent}>
            <div className={styles.uploadText}>
              <p className={styles.dragText}>{dragDropText}</p>
              <span className={styles.browseText}>{browseText}</span>
            </div>
          </div>

          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}

          <input
            ref={fileInputRef}
            type="file"
            className={styles.hiddenInput}
            onChange={handleInputChange}
            accept={allowedTypes.join(',')}
            {...props}
          />
        </div>
      )}

      {/* File Preview - hanya tampil satu file */}
      {showPreview && selectedFiles && selectedFiles.length > 0 && (
        <div className={styles.previewContainer}>
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{selectedFiles[0].name}</span>
              <span className={styles.fileSize}>{formatFileSize(selectedFiles[0].size)}</span>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFiles(null);
                onFileSelect?.(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}