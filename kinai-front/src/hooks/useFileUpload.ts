import { useState, useCallback } from "react";

interface UseFileUploadProps {
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
}

interface UseFileUploadReturn {
  selectedFiles: File[];
  isDragOver: boolean;
  removingIndex: number | null;
  newFileIndex: number | null;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const useFileUpload = ({
  maxFileSize = 100,
  acceptedTypes = [".csv", ".txt"],
  maxFiles = 5,
  onFilesSelected,
}: UseFileUploadProps = {}): UseFileUploadReturn => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [newFileIndex, setNewFileIndex] = useState<number | null>(null);

  const validateFile = useCallback((file: File): boolean => {
    const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
    const isValidType = acceptedTypes.includes(fileExtension);
    const isValidSize = file.size <= maxFileSize * 1024 * 1024;
    return isValidType && isValidSize;
  }, [acceptedTypes, maxFileSize]);

  const processFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(validateFile);
    const newFiles = [...selectedFiles, ...validFiles].slice(0, maxFiles);
    
    if (newFiles.length > 0) {
      setSelectedFiles(newFiles);
      onFilesSelected?.(newFiles);
      
      // Trigger entrance animation for new files
      const newFileCount = newFiles.length - selectedFiles.length;
      if (newFileCount > 0) {
        setNewFileIndex(newFiles.length - 1);
        setTimeout(() => setNewFileIndex(null), 500);
      }
    }
  }, [selectedFiles, maxFiles, validateFile, onFilesSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    
    // Reset input to allow selecting the same file again
    e.target.value = '';
  }, [processFiles]);

  const removeFile = useCallback((indexToRemove: number) => {
    setRemovingIndex(indexToRemove);
    
    // Remove file after animation completes
    setTimeout(() => {
      const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
      setSelectedFiles(newFiles);
      onFilesSelected?.(newFiles);
      setRemovingIndex(null);
    }, 300);
  }, [selectedFiles, onFilesSelected]);


  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    onFilesSelected?.([]);
  }, [onFilesSelected]);

  return {
    selectedFiles,
    isDragOver,
    removingIndex,
    newFileIndex,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    removeFile,
    clearFiles,
  };
};
