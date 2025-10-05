"use client";
import { Box, GlobalStyles } from "@mui/material";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadZone from "./UploadZone";
import FileList from "./FileList";

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  onAnalyzeWithAI?: () => void;
  onUseExampleData?: () => void;
  onEditFile?: (index: number) => void;
  onFileRemoved?: () => void;
  processedFiles?: boolean[];
  maxFileSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number; 
}

const FileDropZone = ({
  onFilesSelected,
  onEditFile,
  onFileRemoved,
  processedFiles = [],
  maxFileSize = 100,
  acceptedTypes = [".csv", ".txt"],
  maxFiles = 5
}: FileDropZoneProps) => {
  const {
    selectedFiles,
    isDragOver,
    removingIndex,
    newFileIndex,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    removeFile,
  } = useFileUpload({
    maxFileSize,
    acceptedTypes,
    maxFiles,
    onFilesSelected,
    onFileRemoved,
  });


  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes slideInFromTop": {
            "0%": {
              transform: "translateY(-10px)",
              opacity: 0,
            },
            "100%": {
              transform: "translateY(0)",
              opacity: 1,
            },
          },
        }}
      />
      <Box sx={{p: "3rem", backgroundColor: "grey.100", borderRadius: "1rem", border: "1px solid", borderColor: "grey.200"}}>
        <input
          id="file-input"
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
        
        <UploadZone
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
          acceptedTypes={acceptedTypes}
          maxFileSize={maxFileSize}
          maxFiles={maxFiles}
        />

        <FileList
          files={selectedFiles}
          maxFiles={maxFiles}
          removingIndex={removingIndex}
          newFileIndex={newFileIndex}
          onRemoveFile={removeFile}
          onEditFile={onEditFile}
          processedFiles={processedFiles}
        />
      </Box>
    </>
  );
};

export default FileDropZone;
