"use client";
import { Box, GlobalStyles } from "@mui/material";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadZone from "./UploadZone";
import FileList from "./FileList";
import ActionButtons from "./ActionButtons";

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  onAnalyzeWithAI?: () => void;
  onUseExampleData?: () => void;
  onEditFile?: (index: number) => void;
  processedFiles?: boolean[];
  maxFileSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number; 
}

const FileDropZone = ({
  onFilesSelected,
  onAnalyzeWithAI,
  onUseExampleData,
  onEditFile,
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
      <Box sx={{
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
      }}>
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

        <ActionButtons
          hasFiles={selectedFiles.length > 0}
          onAnalyzeWithAI={onAnalyzeWithAI}
          onUseExampleData={onUseExampleData}
        />
      </Box>
    </>
  );
};

export default FileDropZone;
